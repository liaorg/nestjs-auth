import { MenuEntity } from "@/modules/menu/entities";
import {
    AdminApiEntity,
    AdminApiPermissionRelationEntity,
    ElementEntity,
    ElementPermissionRelationEntity,
    MenuPermissionRelationEntity,
    OperateEntity,
    OperatePermissionRelationEntity,
    PermissionEntity,
    RoleGroupPermissionRelationEntity,
    RolePermissionRelationEntity,
} from "@/modules/permission/entities";
import { RoleGroupEntity, RoleGroupRoleRelationEntity } from "@/modules/role-group/entities";
import { RoleEntity } from "@/modules/role/entities";
import { UserEntity, UserRoleRelationEntity } from "@/modules/user/entities";
import { DataSource, DataSourceOptions } from "typeorm";

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
        AdminApiPermissionRelationEntity,
        OperatePermissionRelationEntity,
        ElementEntity,
        ElementPermissionRelationEntity,
        RoleGroupPermissionRelationEntity,
        RolePermissionRelationEntity,
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
