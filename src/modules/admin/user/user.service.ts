import { Injectable } from "@nestjs/common";
import { CreateUserDto, UpdateUserDto } from "./dto";
import { UserException } from "./user.exception";
import { UserError } from "@/common/constants";
import { UserEntity } from "./entities";
import { RoleEntity } from "../role/entities";
import { PermissionEntity } from "@/modules/shared/permission/entities";
import { RolePermissionRelationEntity } from "../role/entities/role-permission-relation";
import { AdminRouteEntity, AdminRoutePermissionRelationEntity } from "../common/entities";
import { DbBaseService } from "@/common/services";
import { Brackets, DataSource, ObjectLiteral } from "typeorm";
import { createPassword, createSalt } from "@/common/utils";
import { RoleService } from "../role/role.service";

// 抛出 500类(服务器错误)异常
@Injectable()
export class UserService extends DbBaseService<UserEntity> {
    constructor(protected dataSource: DataSource, private readonly roleService: RoleService) {
        super(dataSource, UserEntity, "user");
    }

    // 获取所有用户-分页查询
    async findAll(
        page?: number,
        limit?: number,
        where?: string | ((qb: this) => string) | Brackets | ObjectLiteral | ObjectLiteral[],
    ): Promise<[number, any[]]> {
        const take = limit ? (limit < 1 ? 10 : limit) : 10;
        const skip = (page ? (page < 0 ? 0 : page) : 0) * take;
        const queryBulider = this.createQueryBuilder();
        // getManyAndCount 暂时存在问题 https://github.com/typeorm/typeorm/issues/8909
        const query = queryBulider.innerJoinAndSelect(RoleEntity, "role", "role.id = user.roleId");
        return await Promise.all([
            query.getCount(),
            query
                .select([
                    "user.id",
                    "user.name",
                    "user.status",
                    "user.is_default",
                    "user.description",
                    "role.id",
                    "role.name",
                    "role.local",
                ])
                .where(where)
                .skip(skip)
                .take(take)
                .getRawMany(),
        ]);
    }

    /**
     * 创建用户
     * @param createUser
     * @returns Promise<User | ServiceResponseData>
     */
    async create(createUser: CreateUserDto): Promise<boolean> {
        const { name, roleId } = createUser;
        // 检查用户名是否存在
        await this.hasUserName(name);
        // 检查角色是否存在
        await this.roleService.findOne(roleId);
        // 把 dto 转换为 entity
        const user = this.dto2entity(createUser, new UserEntity());
        user.passwordSalt = createSalt(16);
        user.password = createPassword(user.password, user.passwordSalt);
        // 写入数据库
        const newUser = await this.insert(user);
        return newUser.raw;
    }

    // 获取指定用户
    async findOne(id: number): Promise<UserEntity> {
        return await this.findById(id);
    }
    // 获取指定用户包含角色信息
    async findUserInfo(id: number): Promise<ObjectLiteral> {
        const queryBulider = this.createQueryBuilder();
        const query = queryBulider.innerJoinAndSelect(RoleEntity, "role", "role.id = user.roleId");
        const userInfo = await query.where("user.id = :id", { id }).getRawOne();
        return userInfo;
    }

    // 更新用户
    async updateById(id: number, updateUser: UpdateUserDto): Promise<boolean> {
        // 检查用户是否存在
        const oldUser = await this.findById(id);
        const { name, roleId } = updateUser;
        // 检查用户名是否存在
        if (name && name !== oldUser.name) {
            await this.hasUserName(name);
        }
        // 检查角色是否存在
        // 角色有改变时才检查
        if (roleId && roleId !== oldUser.roleId) {
            await this.roleService.findOne(roleId);
        }
        // 把 dto 转换为 entity
        const user = this.dto2entity(updateUser, new UserEntity());
        // 如果有密码
        if (user.password) {
            user.passwordSalt = createSalt(16);
            user.password = createPassword(user.password, user.passwordSalt);
        }
        // 更新数据库
        return (await this.update({ id }, user)) ? true : false;
    }

    // 重置密码 根据id修改数据
    async resetPasswordByIds(ids: number[], updateUser: UpdateUserDto): Promise<boolean> {
        // 把 dto 转换为 entity
        const user = this.dto2entity(updateUser, new UserEntity());
        // 如果有密码
        if (user.password) {
            user.passwordSalt = createSalt(16);
            user.password = createPassword(user.password, user.passwordSalt);
            // 事务操作，修改失败后回滚
            return await this.transaction(async () => {
                const hasUpdate = await this.updateByIds(ids, user);
                // 影响行数是否等于传入的 id 数量
                if (hasUpdate === ids.length) {
                    return hasUpdate;
                }
                // 失败返回 false 进行事务回滚
                return false;
            });
        }
        return false;
    }

    // 删除单个用户
    async removeUser(id: number, loginUserId: number): Promise<boolean> {
        // 不能删除当前登录用户，即自己不能删除自己
        this.matchLoginId([id], loginUserId);
        // 检查用户是否存在
        const oldUser = await this.findById(id);
        // 不能删除默认管理员用户
        if (oldUser.isDefault) {
            const error = {
                ...UserError.unDeleteDefault,
            };
            throw new UserException(error);
        }
        const where = { id, isDefault: 0 };
        const andWhere = "id !=" + Number(loginUserId);
        return (await this.delete(where, andWhere)) ? true : false;
    }

    // 批量删除用户 根据id删除数据
    async removeByIds(ids: number[], loginUserId: number): Promise<boolean> {
        // 不能删除当前登录用户，即自己不能删除自己
        this.matchLoginId(ids, loginUserId);
        // 判断是否包含默认管理员用户
        // 不能删除默认管理员用户
        await this.matchIds(ids);
        // 事务操作，删除失败后回滚
        return await this.transaction(async () => {
            const where = { isDefault: 0 };
            const andWhere = "id !=" + Number(loginUserId);
            const hasDelete = await this.deleteByids(ids, where, andWhere);
            // 影响行数是否等于传入的 id 数量
            if (hasDelete === ids.length) {
                return hasDelete;
            }
            // 失败返回 false 进行事务回滚
            return false;
        });
    }
    // 不能删除当前登录用户，即自己不能删除自己
    matchLoginId(ids: number[], loginUserId: number) {
        if (ids.includes(loginUserId)) {
            const error = {
                ...UserError.unContainLoginUser,
            };
            throw new UserException(error);
        }
        return false;
    }
    // 判断是否包含默认管理员用户
    async matchIds(ids: number[]) {
        const query = this.createQueryBuilder();
        const count = await query.whereInIds(ids).getCount();
        if (count) {
            const error = {
                ...UserError.unDeleteDefault,
            };
            throw new UserException(error);
        }
        return false;
    }

    // 获取指定用户
    async findOneByName(name: string): Promise<UserEntity> {
        return await this.findOneBy({ name });
    }

    // 获取指定用户包含密码
    async findOneContainPassword(name: string): Promise<UserEntity> {
        const query = this.createQueryBuilder();
        return await query
            .where({ name })
            .select(["user.id", "user.name", "user.password", "user.passwordSalt"])
            .getOne();
    }

    // 根据 id 查找用户
    async findById(id: number) {
        const existUser = await this.findOneBy({ id });
        if (!existUser) {
            const error = {
                ...UserError.notExisted,
                args: { id },
            };
            throw new UserException(error);
        }
        return existUser;
    }
    // 检查用户名是否存在
    async hasUserName(name: string) {
        // 检查用户名是否存在
        const hasUser = await this.findOneBy({ name });
        if (hasUser) {
            const error = {
                ...UserError.existedName,
                args: { name },
            };
            throw new UserException(error);
        }
        return false;
    }
    // 验证用户路由权限
    async matchRoutePermission(id: number, path: string, method: string): Promise<boolean> {
        // user_role_relation role_permission_relation
        const querybuilder = this.createQueryBuilder();
        const query = querybuilder
            .leftJoinAndSelect(RoleEntity, "role", "role.id = user.roleId")
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
