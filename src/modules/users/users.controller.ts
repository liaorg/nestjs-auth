import { RequestValidationPipe } from "@/common/pipes";
import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    UseInterceptors,
    UsePipes,
} from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreateUserDto, UpdateUserDto, UserDto } from "./dto";
import { createUserSchema, User } from "./schemas";
import { UsersException } from "./users.exception";
// import { UsersErrorCode } from "@/common/enums";
import { UsersService } from "./users.service";

// 抛出 400类(客户端错误)异常 500类(服务器错误)异常

// interface UserList {
//     list: User[];
//     count: number;
// }

@ApiTags("用户管理")
@Controller("users")
export class UsersController {
    constructor(public userService: UsersService) {}

    @ApiOperation({ summary: "创建用户" })
    // @UseInterceptors(ClassSerializerInterceptor)
    @UsePipes(new RequestValidationPipe(createUserSchema))
    @Post()
    async create(@Body() post: CreateUserDto) {
        const user = await this.userService.create(post);
        if (user["errorCode"]) {
            throw new UsersException(user["errorMessage"], user["errorCode"]);
        }
        return user;
    }

    @ApiOperation({ summary: "获取用户列表" })
    // @UseInterceptors(ClassSerializerInterceptor)
    @Get()
    async findAll(): Promise<User[]> {
        return await this.userService.findAll();
    }

    // @Get()
    // async findAll(@Query() query): Promise<UserList> {
    //     return await this.userService.findAll(query);
    // }

    @ApiOperation({ summary: "获取指定用户" })
    @UseInterceptors(ClassSerializerInterceptor)
    @Get(":id")
    async findById(@Param("id") id: string) {
        const user = await this.userService.findById(id);

        console.log("user", user);
        return new UserDto(user);
    }

    @ApiOperation({ summary: "更新用户" })
    @Patch(":id")
    async update(@Param("id") id: string, @Body() post: UpdateUserDto) {
        return await this.userService.updateById(id, post);
    }

    @ApiOperation({ summary: "删除用户" })
    @Delete(":id")
    async remove(@Param("id") id: string) {
        return await this.userService.remove(id);
    }
}
