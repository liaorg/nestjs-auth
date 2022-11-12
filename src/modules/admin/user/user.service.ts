import { Injectable } from "@nestjs/common";
import { CreateUserDto, UpdateUserDto } from "./dto";
import { UserException } from "./user.exception";
import { UsersError } from "@/common/constants";
import { UserEntity, UserRoleRelationEntity } from "./entities";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { UserInfoDto } from "./dto/user-info.dto";
import { RequestUserDto } from "@/modules/shared/auth/dto";
import { RoleEntity } from "../role/entities";
import { OperateEntity, PermissionEntity } from "@/modules/shared/permission/entities";
import { RolePermissionRelationEntity } from "../role/entities/role-permission-relation";
import { AdminApiEntity, AdminApiOperatePermissionRelationEntity } from "../common/entities";
import { appConfig } from "@/config";

// 抛出 500类(服务器错误)异常

// interface UserList {
//     list: User[];
//     count: number;
// }

@Injectable()
export class UserService {
    constructor(
        // 使用 @InjectRepository() 装饰器注入 存储库
        @InjectRepository(UserEntity) private repository: Repository<UserEntity>,
    ) {}

    /**
     * 创建用户
     * @param createUser
     * @returns Promise<User | ServiceResponseData>
     */
    async create(createUser: CreateUserDto): Promise<boolean> {
        const { username } = createUser;
        // 查看用户是否存在
        const user = await this.repository.findOneBy({ name: username });
        if (user) {
            const error = {
                ...UsersError.existedName,
                args: { name: username },
            };
            throw new UserException(error);
        }
        // 把 dto 转换为 schema
        const newUser = this.repository.create({
            name: username,
        });
        // 写入数据库
        return (await this.repository.insert(newUser)) ? true : false;
    }

    // 获取用户列表
    async findAll(): Promise<UserInfoDto[]> {
        return await this.repository.find();
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
    async findOne(id: number): Promise<UserInfoDto> {
        return await this.findById(id);
    }

    // 更新用户
    async updateById(id: number, updateUser: UpdateUserDto): Promise<boolean> {
        await this.findById(id);
        return (await this.repository.update(id, updateUser)) ? true : false;
    }

    // 删除用户
    async remove(id: number) {
        const user = await this.findById(id);
        return (await this.repository.remove(user)) ? true : false;
    }

    // 获取指定用户
    async findOneByName(username: string): Promise<UserEntity> {
        return await this.repository.findOneBy({ name: username });
    }

    // 根据 id 查找用户
    async findById(id: number) {
        const existUser = await this.repository.findOneBy({ id });
        if (!existUser) {
            const error = {
                ...UsersError.notExisted,
                args: { id },
            };
            throw new UserException(error);
        }
        return existUser;
    }
    // 获取用户信息包括角色和权限
    async findeUserRolePermission(name: string): Promise<RequestUserDto> {
        // user_role_relation role_permission_relation
        const query = this.repository
            .createQueryBuilder("user")
            .leftJoinAndSelect(
                UserRoleRelationEntity,
                "user_role_relation",
                "user_role_relation.userId = user.id",
            )
            .leftJoinAndSelect(RoleEntity, "role", "role.id = user_role_relation.roleId")
            .leftJoinAndSelect(
                RolePermissionRelationEntity,
                "role_permission_relation",
                "role_permission_relation.roleId = role.id",
            )
            .leftJoinAndSelect(
                PermissionEntity,
                "permission",
                "permission.id = role_permission_relation.permissionId",
            )
            .leftJoinAndSelect(
                AdminApiOperatePermissionRelationEntity,
                "admin_api_operate_permission_relation",
                "admin_api_operate_permission_relation.permissionId = permission.id",
            )
            .leftJoinAndSelect(
                AdminApiEntity,
                "admin_api",
                "admin_api.id = admin_api_operate_permission_relation.adminApiId",
            )
            .leftJoinAndSelect(
                OperateEntity,
                "operate",
                "operate.id = admin_api_operate_permission_relation.operateId",
            );
        const user: {
            user_id: number;
            user_name: string;
            role_id: number;
            role_name: string;
            role_locale: string;
            admin_api_path: string;
            operate_method: string;
        }[] = await query
            .select([
                "user.id",
                "user.name",
                "role.id",
                "role.name",
                "role.locale",
                "role.is_default",
                "permission.id",
                "permission.type",
                "admin_api.id",
                "admin_api.path",
                "operate.id",
                "operate.method",
            ])
            .where("user.name = :name", { name })
            .andWhere("permission.type = :permissionType", { permissionType: "admin_api" })
            .getRawMany();
        const userInfo: RequestUserDto = { id: 1, name: "", roleId: 0, auth: [] };
        if (user.length) {
            userInfo.id = user[0].user_id;
            userInfo.name = user[0].user_name;
            userInfo.roleId = user[0].role_id;
            user.forEach((u) => {
                userInfo.auth.push({
                    path: "/" + appConfig.adminPrefix + u.admin_api_path,
                    method: u.operate_method,
                });
            });
            console.log("userInfo", userInfo);
        }

        return {
            id: 1,
            name: "admin",
            roleId: 1,
            auth: [],
        };
    }
}
