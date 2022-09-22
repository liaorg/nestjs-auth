import { Injectable } from "@nestjs/common";
import { CreateUserDto, UpdateUserDto } from "./dto";
import { InjectModel } from "@nestjs/mongoose";
import { Users, UsersDocument } from "./schemas/users.schema";
import { Model, ObjectId } from "mongoose";
import { UserDto } from "./dto/user.dto";
import { UsersException } from "./users.exception";
import { UsersError } from "@/common/constants";

// 抛出 500类(服务器错误)异常

// interface UserList {
//     list: User[];
//     count: number;
// }

@Injectable()
export class UsersService {
    constructor(
        // 使用 @InjectModel() 装饰器注入 模型
        @InjectModel(Users.name) private model: Model<UsersDocument>,
    ) {}

    /**
     * 创建用户
     * @param createUser
     * @returns Promise<User | ServiceResponseData>
     */
    async create(createUser: CreateUserDto): Promise<boolean> {
        const { username } = createUser;
        // 查看用户是否存在 exec()
        const user = await this.model.findOne({ username }).lean();
        if (user) {
            const error = {
                ...UsersError.existedName,
                args: { name: username },
            };
            throw new UsersException(error);
        }
        // 把 dto 转换为 schema
        const newUser = new this.model(createUser);
        // 写入数据库
        return (await newUser.save()) ? true : false;
        // 写入数据库
        // return await this.model.create(createUser);
    }

    // 获取用户列表
    async findAll(): Promise<Users[]> {
        // .select(["-x"]) 排除 x 字段
        // return await this.model.find().select(["-password", "-passwordSalt"]);
        return await this.model.find().lean();
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
    async findOne(id: ObjectId | string): Promise<UserDto> {
        return await this.findById(id);
    }

    // 更新用户
    async updateById(id: ObjectId, updateUser: UpdateUserDto): Promise<boolean> {
        await this.findById(id);
        return (await this.model.findByIdAndUpdate(id, updateUser).lean()) ? true : false;
    }

    // 删除用户
    async remove(id: ObjectId) {
        await this.findById(id);
        return (await this.model.findByIdAndDelete(id).lean()) ? true : false;
    }

    // 获取指定用户
    async findOneByName(username: string): Promise<UserDto> {
        return await this.model.findOne({ username }).lean();
    }

    // 根据 id 查找用户
    private async findById(id: ObjectId | string) {
        const existUser = await this.model.findById(id).lean();
        if (!existUser) {
            const error = {
                ...UsersError.notExisted,
                args: { id },
            };
            throw new UsersException(error);
        }
        // existUser["createdAt"] = getUTCTime({ date: existUser.createdDate * 1000 }).format("YYYY-MM-DD HH:mm:ss");
        // existUser["updateAt"] = getTime({ date: existUser.updateDate * 1000 }).format("YYYY-MM-DD HH:mm:ss");

        return existUser;
    }
}
