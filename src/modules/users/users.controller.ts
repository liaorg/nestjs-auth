import { Controller, Get, /*  Post, Body, Patch,  */ Param, Delete } from "@nestjs/common";
import { UsersErrorCode } from "./enums/users-error-code.enum";
import { UsersException } from "./users.exception";
import { UsersService } from "./users.service";
// import { CreateUserDto } from "./dto/create-user.dto";
// import { UpdateUserDto } from "./dto/update-user.dto";

@Controller("users")
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    // @Post()
    // create(@Body() createUserDto: CreateUserDto) {
    //     return this.usersService.create(createUserDto);
    // }

    @Get()
    findAll() {
        return this.usersService.findAll();
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        throw new UsersException(`error userid #${id}`, UsersErrorCode.ERROR_USERID);
        // return this.usersService.findOne(+id);
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
