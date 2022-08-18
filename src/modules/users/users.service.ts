import { Injectable } from "@nestjs/common";
import { I18nService } from "nestjs-i18n";
import { UsersErrorCode } from "@/common/enums";
import { ServiceResponseData } from "@/common/interfaces";
import { CreateUserDto, UpdateUserDto } from "./dto";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "./schemas/users.schema";
import { Model } from "mongoose";
import { UserDto } from "./dto/user.dto";
// 抛出 500类(服务器错误)异常

// interface UserList {
//     list: User[];
//     count: number;
// }

@Injectable()
export class UsersService {
    constructor(
        // 使用 @InjectModel() 装饰器注入 模型
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        // 引入I18n服务解析多语言
        private readonly i18nService: I18nService,
    ) {}

    /**
     * 创建用户
     * @param createUser
     * @returns Promise<User | ServiceResponseData>
     */
    async create(createUser: CreateUserDto): Promise<boolean | ServiceResponseData> {
        const { username } = createUser;
        // 查看用户是否存在 exec()
        const user = await this.userModel.findOne({ username });
        if (user) {
            const errorMessage = await this.i18nService.t("users.errorCode.EXISTED_USERNAME", {
                args: { username },
            });
            return { errorCode: UsersErrorCode.EXISTED_USERNAME, errorMessage };
        }
        // 把 schema 转换为 entity
        const newUser = new this.userModel(createUser);
        // 写入数据库
        return (await newUser.save()) ? true : false;
        // 写入数据库
        // return await this.userModel.create(createUser);
    }

    // 获取用户列表
    async findAll(): Promise<User[]> {
        return await this.userModel.find();
    }

    // async findAll(query): Promise<UserList> {
    //     // const qb = this.usersRepository.createQueryBuilder("post");
    //     const qb = get(User).createQueryBuilder("post");
    //     console.log("qb", qb);

    //     //qb.where("1 = 1");
    //     //qb.orderBy("post.user_status", "DESC");
    //     const count = await qb.getCount();
    //     const { pageNum = 1, pageSize = 10 } = query;
    //     qb.limit(pageSize);
    //     qb.offset(pageSize * (pageNum - 1));
    //     const posts = await qb.getMany();
    //     return { list: posts, count: count };
    // }

    // 获取指定用户
    async findById(id: string): Promise<UserDto | ServiceResponseData> {
        const user = await this.userModel.findById(id);
        if (!user) {
            const errorMessage = await this.i18nService.t("users.errorCode.NOT_EXISTED_USERID", {
                args: { userid: id },
            });
            return { statusCode: 404, errorCode: UsersErrorCode.EXISTED_USERNAME, errorMessage };
        }
        return user;
    }

    // 更新用户
    async updateById(id: string, updateUser: UpdateUserDto): Promise<boolean | ServiceResponseData> {
        const existUser = await this.userModel.findById(id);
        if (!existUser) {
            const errorMessage = await this.i18nService.t("users.errorCode.NOT_EXISTED_USERID", {
                args: { userid: id },
            });
            return { statusCode: 404, errorCode: UsersErrorCode.EXISTED_USERNAME, errorMessage };
        }
        return (await this.userModel.findByIdAndUpdate(id, updateUser)) ? true : false;
    }

    // 删除用户
    async remove(id: string) {
        const existUser = await this.userModel.findById(id);
        if (!existUser) {
            const errorMessage = await this.i18nService.t("users.errorCode.NOT_EXISTED_USERID", {
                args: { userid: id },
            });
            return { statusCode: 404, errorCode: UsersErrorCode.EXISTED_USERNAME, errorMessage };
        }
        return await this.userModel.findByIdAndRemove(id);
    }
}
