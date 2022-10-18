import { AccessTokensEntity, RefreshTokensEntity } from "@/modules/auth/entities";
import { RoleTypesEntity } from "@/modules/role-types/entities";
import { RolesEntity } from "@/modules/roles/entities";
import { RoutesEntity } from "@/modules/routes/entities";
import { UsersEntity } from "@/modules/users/entities";
import { DataSource, DataSourceOptions } from "typeorm";

export const dbConfig: DataSourceOptions = {
    type: "sqlite",
    synchronize: false, // 从entities属性产生SQL，并创建表格
    logging: ["error"], // 执行SQL会打印在控制台中 query error
    database: process.env.AUTHDB || "/mnt/sqlite-data/auth.db",
    entities: [RoleTypesEntity, RolesEntity, UsersEntity, RoutesEntity, AccessTokensEntity, RefreshTokensEntity],
};

export const sqlite3db = new DataSource(dbConfig);
