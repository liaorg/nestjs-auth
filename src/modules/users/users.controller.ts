import { ObjectSerializerDtoDecorator } from "@/common/decorators";
import { ObjectSerializerInterceptor } from "@/common/interceptors/object-serializer.interceptor";
import { ObjectIdValidationPipe } from "@/common/pipes";
import { Body, Controller, Delete, Get, Param, Patch, Post, UseInterceptors } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { ObjectId } from "mongoose";
import { GuestDecorator } from "../auth/decorators";
import { CreateUserDto, UpdateUserDto, UserDto } from "./dto";
import { User } from "./schemas";
import { UsersService } from "./users.service";

// 抛出 400类(客户端错误)异常 500类(服务器错误)异常

// interface UserList {
//     list: User[];
//     count: number;
// }

@ApiTags("用户管理")
@Controller("users")
// 根据 UserDto 转换和净化数据，转换和净化输出的数据
@ObjectSerializerDtoDecorator(UserDto)
@UseInterceptors(ObjectSerializerInterceptor)
export class UsersController {
    constructor(public userService: UsersService) {}

    @ApiOperation({ summary: "创建用户" })
    @Post()
    @GuestDecorator()
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
    async findById(@Param("id", ObjectIdValidationPipe) id: ObjectId): Promise<UserDto> {
        return await this.userService.findById(id);
    }

    @ApiOperation({ summary: "更新用户" })
    @Patch(":id")
    async update(@Param("id", ObjectIdValidationPipe) id: ObjectId, @Body() post: UpdateUserDto) {
        return await this.userService.updateById(id, post);
    }

    @ApiOperation({ summary: "删除用户" })
    @Delete(":id")
    async remove(@Param("id", ObjectIdValidationPipe) id: ObjectId) {
        return await this.userService.remove(id);
    }
}
