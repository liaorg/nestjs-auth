import { Controller, Get, /*  Post, Body, Patch,  */ Param, Delete } from "@nestjs/common";
import { UsersException } from "./users.exception";
// import { UsersErrorCode } from "@/common/enums";
import { UsersService } from "./users.service";
// import { CreateUserDto } from "./dto/create-user.dto";
// import { UpdateUserDto } from "./dto/update-user.dto";
// 抛出 400类(客户端错误)异常 500类(服务器错误)异常

@Controller("users")
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    // @Post()
    // create(@Body() createUserDto: CreateUserDto) {
    //     return this.usersService.create(createUserDto);
    // }

    @Get()
    async findAll() {
        return await this.usersService.findAll();
    }

    @Get(":id")
    async findOne(@Param("id") id: string) {
        const user = await this.usersService.findOne(id);
        if (user.errorCode) {
            throw new UsersException(user.errorMessage, user.errorCode);
        }
        return user;
    }

    // @Patch(":id")
    // update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    //     return this.usersService.update(+id, updateUserDto);
    // }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.usersService.remove(+id);
    }
}
