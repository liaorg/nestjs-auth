import { ServiceResponseData } from "@/common/interfaces";
import { Injectable } from "@nestjs/common";
import { I18nService } from "nestjs-i18n";
import { UsersErrorCode } from "@/common/enums";
// import { CreateUserDto } from "./dto/create-user.dto";
// import { UpdateUserDto } from "./dto/update-user.dto";
// 抛出 500类(服务器错误)异常

@Injectable()
export class UsersService {
    // 引入I18n服务解析多语言
    constructor(private readonly i18nService: I18nService) {}
    // create(createUserDto: CreateUserDto) {
    //     return "This action adds a new user";
    // }

    async findAll(): Promise<ServiceResponseData> {
        // return `This action returns all users`;
        return await this.i18nService.t("users.allUser");
    }

    async findOne(id: string) {
        const errorMessage = await this.i18nService.t("users.errorCode.ERROR_USERID", { args: { userid: id } });
        return { errorCode: UsersErrorCode.ERROR_USERID, errorMessage };
    }

    // update(id: number, updateUserDto: UpdateUserDto) {
    //     return `This action updates a #${id} user`;
    // }

    remove(id: number) {
        return `This action removes a #${id} user`;
    }
}
