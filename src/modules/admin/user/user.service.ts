import { Injectable } from "@nestjs/common";
import { CreateUserDto, UpdateUserDto } from "./dto";
import { UserException } from "./user.exception";
import { UsersError } from "@/common/constants";
import { UserEntity, UserRoleRelationEntity } from "./entities";
import { UserInfoDto } from "./dto/user-info.dto";
import { RoleEntity } from "../role/entities";
import { PermissionEntity } from "@/modules/shared/permission/entities";
import { RolePermissionRelationEntity } from "../role/entities/role-permission-relation";
import { AdminRouteEntity, AdminRoutePermissionRelationEntity } from "../common/entities";
import { DbBaseService } from "@/common/services";
import { DataSource } from "typeorm";

// 抛出 500类(服务器错误)异常

// interface UserList {
//     list: User[];
//     count: number;
// }

@Injectable()
export class UserService extends DbBaseService<UserEntity> {
    constructor(protected dataSource: DataSource) {
        super(dataSource, UserEntity, "user");
    }

    /**
     * 创建用户
     * @param createUser
     * @returns Promise<User | ServiceResponseData>
     */
    async create(createUser: CreateUserDto): Promise<boolean> {
        const { username } = createUser;
        // 查看用户是否存在
        const hasUser = await this.findOneBy({ name: username });
        if (hasUser) {
            const error = {
                ...UsersError.existedName,
                args: { name: username },
            };
            throw new UserException(error);
        }
        // 把 dto 转换为 schema
        const user = new UserEntity();
        user.name = username;
        // 写入数据库
        return (await this.insert(user)) ? true : false;
    }

    // 获取用户列表
    async findAll(): Promise<UserInfoDto[]> {
        return await this.findMany("1");
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
        return (await this.update(updateUser, { id })) ? true : false;
    }

    // 删除用户
    async remove(id: number) {
        await this.findById(id);
        return (await this.delete({ id })) ? true : false;
    }

    // 获取指定用户
    async findOneByName(username: string): Promise<UserEntity> {
        return await this.findOneBy({ name: username });
    }

    // 根据 id 查找用户
    async findById(id: number) {
        const existUser = await this.findOneBy({ id });
        if (!existUser) {
            const error = {
                ...UsersError.notExisted,
                args: { id },
            };
            throw new UserException(error);
        }
        return existUser;
    }
    // 验证用户路由权限
    async matchRoutePermission(id: number, path: string, method: string): Promise<boolean> {
        // user_role_relation role_permission_relation
        const query = this.query
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
                AdminRoutePermissionRelationEntity,
                "admin_route_permission_relation",
                "admin_route_permission_relation.permissionId = permission.id",
            )
            .leftJoinAndSelect(
                AdminRouteEntity,
                "admin_route",
                "admin_route.id = admin_route_permission_relation.adminRouteId",
            );
        const userRoute = await query
            .select([
                "user.id",
                "user.name",
                "role.id",
                "role.name",
                "admin_route.path",
                "admin_route.method",
            ])
            .where("user.id = :id", { id })
            .andWhere("permission.type = :permissionType", { permissionType: "admin_route" })
            .andWhere("admin_route.path = :path", { path })
            .andWhere("admin_route.method = :method", { method })
            .getRawOne();
        if (userRoute) {
            return true;
        }
        return false;
    }
}
