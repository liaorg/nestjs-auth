import { Injectable } from "@nestjs/common";
import { I18nService } from "nestjs-i18n";
// import { CreateUserDto } from "./dto/create-user.dto";
// import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UsersService {
    // 引入I18n服务解析多语言
    constructor(private readonly i18nService: I18nService) {}
    // create(createUserDto: CreateUserDto) {
    //     return "This action adds a new user";
    // }

    async findAll() {
        // return `This action returns all users`;
        return await this.i18nService.t("users.allUser");
    }

    findOne(id: number) {
        return `This action returns a #${id} user`;
    }

    // update(id: number, updateUserDto: UpdateUserDto) {
    //     return `This action updates a #${id} user`;
    // }

    remove(id: number) {
        return `This action removes a #${id} user`;
    }
}
