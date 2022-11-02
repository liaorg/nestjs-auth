import { ObjectSerializerDtoDecorator } from "@/common/decorators";
import { ObjectSerializerInterceptor } from "@/common/interceptors/object-serializer.interceptor";
import { Body, Controller, Delete, Get, Param, Patch, Post, UseInterceptors } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { GuestDecorator } from "../auth/decorators";
import { CreateUserDto, UpdateUserDto, UserDto } from "./dto";
import { UserInfoDto } from "./dto/user-info.dto";
import { UserService } from "./user.service";

// 抛出 400类(客户端错误)异常 500类(服务器错误)异常

// interface UserList {
//     list: User[];
//     count: number;
// }

@ApiTags("用户管理")
@Controller("user")
// 根据 UserDto 转换和净化数据，转换和净化输出的数据
@ObjectSerializerDtoDecorator(UserDto)
@UseInterceptors(ObjectSerializerInterceptor)
export class UserController {
    constructor(public service: UserService) {}

    @ApiOperation({ summary: "创建用户" })
    @Post()
    @GuestDecorator()
    async create(@Body() post: CreateUserDto) {
        return await this.service.create(post);
    }

    @ApiOperation({ summary: "获取用户列表" })
    @Get()
    async findAll(): Promise<UserInfoDto[]> {
        return await this.service.findAll();
    }

    // @Get()
    // async findAll(@Query() query): Promise<UserList> {
    //     return await this.userService.findAll(query);
    // }

    @ApiOperation({ summary: "获取指定用户" })
    @Get(":id")
    async findById(@Param("id") id: number): Promise<UserInfoDto> {
        return await this.service.findOne(id);
    }

    @ApiOperation({ summary: "更新用户" })
    @Patch(":id")
    async update(@Param("id") id: number, @Body() post: UpdateUserDto) {
        return await this.service.updateById(id, post);
    }

    @ApiOperation({ summary: "删除用户" })
    @Delete(":id")
    async remove(@Param("id") id: number) {
        return await this.service.remove(id);
    }
}
