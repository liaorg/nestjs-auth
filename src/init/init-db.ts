import { RoleTypesEntity } from "@/modules/role-types/entities";
import { RolesEntity } from "@/modules/roles/entities";
import { RoutesEntity } from "@/modules/routes/entities";
import { UsersEntity } from "@/modules/users/entities";
import { Logger } from "@nestjs/common";
import { I18nService } from "nestjs-i18n";
import { basename } from "path";
import { EntityTarget } from "typeorm";
import {
    createAccessTokenSql,
    createRefresTokenSql,
    createRoleSql,
    createRoleTypeSql,
    createRouteSql,
    createUserSql,
    defaultRole,
    defaultRoleType,
    defaultRoute,
    defaultUser,
} from "./consts";
import { dbConfig, sqlite3db } from "./db";

const initLogger = new Logger("db", { timestamp: true });

// 增加或更新自增加ID
const setSequence = (tablename: string, isInsert?: boolean) => {
    if (!isInsert) {
        // 更新自增加ID
        const sqlSequence = `UPDATE SQLITE_SEQUENCE SET seq=99 WHERE name="${tablename}";`;
        sqlite3db.query(sqlSequence);
    } else {
        // 新增加自增加ID
        const sqlSequence = `INSERT INTO SQLITE_SEQUENCE (name, seq) VALUES ("${tablename}", 99);`;
        sqlite3db.query(sqlSequence);
    }
};

// 创建表并增加数据
const createAndInsert = async (
    opt: { tablename: string; createSql: string; entity?: EntityTarget<object>; defaultData?: object[] },
    i18n: I18nService,
) => {
    // 创建角色类型表
    const { tablename, createSql, entity, defaultData } = opt;
    initLogger.log(i18n.t("init.begainInitTable", { args: { tablename } }));
    await sqlite3db.query(createSql);
    // 添加数据
    const roleType = sqlite3db.getRepository(entity);
    await roleType.insert(defaultData);
    // const data = await repository.find();
    // initLogger.log(data);
    // 更新自增加ID
    setSequence(tablename);
    initLogger.log(i18n.t("init.finishedInitTable", { args: { tablename } }));
};

// 创建token表
const createToken = async (tablename: string, createSql: string, i18n: I18nService) => {
    initLogger.log(i18n.t("init.begainInitTable", { args: { tablename } }));
    await sqlite3db.query(createSql);
    initLogger.log(i18n.t("init.finishedInitTable", { args: { tablename } }));
};

// 初始化默认用户，路由菜单，角色类型，角色等
export async function initDefaultData(i18n: I18nService) {
    initLogger.log(i18n.t("init.begainInitDb"));
    // 数据库初始化
    try {
        await sqlite3db.initialize();
        initLogger.log(i18n.t("init.dbConnected") + ` ${basename(dbConfig.database as string)}`);
        // 删除数据库及其所有数据
        await sqlite3db.dropDatabase();
        await Promise.all([
            // 创建角色类型表
            createAndInsert(
                {
                    tablename: "role_types",
                    createSql: createRoleTypeSql,
                    entity: RoleTypesEntity,
                    defaultData: defaultRoleType,
                },
                i18n,
            ),
            // 创建角色表
            createAndInsert(
                {
                    tablename: "roles",
                    createSql: createRoleSql,
                    entity: RolesEntity,
                    defaultData: defaultRole,
                },
                i18n,
            ),
            // 用户表
            createAndInsert(
                {
                    tablename: "users",
                    createSql: createUserSql,
                    entity: UsersEntity,
                    defaultData: defaultUser,
                },
                i18n,
            ),
            // 路由菜单表
            createAndInsert(
                {
                    tablename: "routes",
                    createSql: createRouteSql,
                    entity: RoutesEntity,
                    defaultData: defaultRoute,
                },
                i18n,
            ),
            // 令牌token
            createToken("access_tokens", createAccessTokenSql, i18n),
            createToken("refresh_tokens", createRefresTokenSql, i18n),
        ]);

        // 数据库初始化结束
        initLogger.log(i18n.t("init.finishedInitDb"));
    } catch (error) {
        initLogger.log(i18n.t("init.initDbFailed"));
        console.log(error);
    }
}
