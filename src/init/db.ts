import { MenuEntity } from "@/modules/admin/menu/entities";
import { OperateEntity, PermissionEntity } from "@/modules/shared/permission/entities";
import { RoleGroupEntity, RoleGroupRoleRelationEntity } from "@/modules/admin/role-group/entities";
import { RoleEntity } from "@/modules/admin/role/entities";
import { UserEntity, UserRoleRelationEntity } from "@/modules/admin/user/entities";
import { DataSource, DataSourceOptions } from "typeorm";
import { MenuPermissionRelationEntity } from "@/modules/admin/menu/entities/menu-permission-relation.entity";
import { AdminApiEntity } from "@/modules/admin/common/entities/admin-api.entity";
import { ElementEntity } from "@/modules/admin/common/entities/element.entyty";
import { ElementPermissionRelationEntity } from "@/modules/admin/common/entities/element-permission-relation.entity";
import { RoleGroupPermissionRelationEntity } from "@/modules/admin/role-group/entities/role-group-permission-relation";
import { RolePermissionRelationEntity } from "@/modules/admin/role/entities/role-permission-relation";
import { AdminApiOperatePermissionRelationEntity } from "@/modules/admin/common/entities";

export const dbConfig: DataSourceOptions = {
    type: "sqlite",
    synchronize: false, // 从entities属性产生SQL，并创建表格
    logging: ["error"], // 执行SQL会打印在控制台中 query error
    database: process.env.AUTHDB || "/mnt/sqlite-data/auth.db",
    entities: [
        RoleGroupEntity,
        RoleEntity,
        UserEntity,
        RoleGroupRoleRelationEntity,
        UserRoleRelationEntity,
        MenuEntity,
        PermissionEntity,
        MenuPermissionRelationEntity,
        OperateEntity,
        AdminApiEntity,
        // AdminApiPermissionRelationEntity,
        // OperatePermissionRelationEntity,
        ElementEntity,
        ElementPermissionRelationEntity,
        RoleGroupPermissionRelationEntity,
        RolePermissionRelationEntity,
        AdminApiOperatePermissionRelationEntity,
    ],
};

export const DB = new DataSource(dbConfig);

export const DBQuery = DB.createQueryBuilder();

export const DBInsert = async (entity, data) => {
    return await DBQuery.insert().into(entity).values(data).execute();
};

export const DBUpdate = async (entity, data, where) => {
    return await DBQuery.update(entity).set(data).where(where).execute();
};

export const DBDelete = async (entity, where) => {
    return await DBQuery.delete().from(entity).where(where).execute();
};
