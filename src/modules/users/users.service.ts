import { Injectable } from "@nestjs/common";
import { I18nService } from "nestjs-i18n";
import { UsersErrorCode } from "@/common/enums";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities";
import { Repository } from "typeorm";
import { ServiceResponseData } from "@/common/interfaces";
import { CreateUserDto, UpdateUserDto } from "./dto";
// 抛出 500类(服务器错误)异常

export interface UserList {
    list: User[];
    count: number;
}

@Injectable()
export class UsersService {
    constructor(
        // 引入存储库
        @InjectRepository(User) private usersRepository: Repository<User>,
        // 引入I18n服务解析多语言
        private readonly i18nService: I18nService,
    ) {}

    /**
     * 创建用户
     * @param createUser
     * @returns Promise<User | ServiceResponseData>
     */
    async create(createUser: CreateUserDto): Promise<User | ServiceResponseData> {
        const { username } = createUser;
        // 必要参数验证
        // if (!account_name) {
        //     errorMessage = await this.i18nService.t("users.errorCode.REQUIRED_USERNAME");
        //     return { errorCode: UsersErrorCode.EXISTED_USERNAME, errorMessage };
        // }
        // 查看用户是否存在
        const user = await this.usersRepository.findOne({ where: { username } });
        if (user) {
            const errorMessage = await this.i18nService.t("users.errorCode.EXISTED_USERNAME", {
                args: { username },
            });
            return { errorCode: UsersErrorCode.EXISTED_USERNAME, errorMessage };
        }
        const newUser = this.usersRepository.create(createUser);
        // 写入数据库
        return await this.usersRepository.save(newUser);
    }

    // 获取用户列表
    async findAll(): Promise<User[]> {
        return await this.usersRepository.find();
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
    async findById(id): Promise<User | ServiceResponseData> {
        return await this.usersRepository.findOne(id);
    }

    // 更新用户
    async updateById(id, updateUser: UpdateUserDto): Promise<User | ServiceResponseData> {
        const existUser = await this.usersRepository.findOne(id);
        if (!existUser) {
            const errorMessage = await this.i18nService.t("users.errorCode.NOT_EXISTED_USERID", {
                args: { userid: id },
            });
            return { errorCode: UsersErrorCode.EXISTED_USERNAME, errorMessage };
        }
        const newUser = this.usersRepository.merge(existUser, updateUser);
        return this.usersRepository.save(newUser);
    }

    // 删除用户
    async remove(id) {
        const existUser = await this.usersRepository.findOne(id);
        if (!existUser) {
            const errorMessage = await this.i18nService.t("users.errorCode.NOT_EXISTED_USERID", {
                args: { userid: id },
            });
            return { errorCode: UsersErrorCode.EXISTED_USERNAME, errorMessage };
        }
        return await this.usersRepository.remove(existUser);
    }
}
