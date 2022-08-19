import { ObjectSerializerDtoDecorator } from "@/common/decorators";
import { ObjectSerializerInterceptor } from "@/common/interceptors/object-serializer.interceptor";
import { ObjectIdValidationPipe, RequestSchemaValidationPipe } from "@/common/pipes";
import { Body, Controller, Delete, Get, Param, Patch, Post, UseInterceptors, UsePipes } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { ObjectId } from "mongoose";
import { CreateUserDto, UpdateUserDto, UserDto } from "./dto";
import { createUserSchema, User } from "./schemas";
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
    @Post()
    // 数据参数校验
    @UsePipes(new RequestSchemaValidationPipe(createUserSchema))
    async create(@Body() post: CreateUserDto) {
        return await this.userService.create(post);
    }

    @ApiOperation({ summary: "获取用户列表" })
    @Get()
    async findAll(): Promise<User[]> {
        return await this.userService.findAll();
    }

    // @Get()
    // async findAll(@Query() query): Promise<UserList> {
    //     return await this.userService.findAll(query);
    // }

    @ApiOperation({ summary: "获取指定用户" })
    @Get(":id")
    // 转换和净化输出的数据
    @UseInterceptors(ObjectSerializerInterceptor)
    // 根据 UserDto 转换和净化数据
    @ObjectSerializerDtoDecorator(UserDto)
    async findById(@Param("id", ObjectIdValidationPipe) id: ObjectId): Promise<UserDto> {
        const user = await this.userService.findById(id);
        // console.log("user", user, new UserDto(), plainToClass(UserDto, JSON.parse(JSON.stringify(user))));
        // const newuser = plainToClass(UserDto, user);
        // console.log("newuser", newuser);
        return user;
    }

    @ApiOperation({ summary: "更新用户" })
    @Patch(":id")
    async update(@Param("id") id: ObjectId, @Body() post: UpdateUserDto) {
        return await this.userService.updateById(id, post);
    }

    @ApiOperation({ summary: "删除用户" })
    @Delete(":id")
    async remove(@Param("id") id: ObjectId) {
        return await this.userService.remove(id);
    }
}
