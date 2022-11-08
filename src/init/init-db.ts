import { OperateEntity } from "@/modules/permission/entities";
import { RoleGroupEntity, RoleGroupRoleRelationEntity } from "@/modules/role-group/entities";
import { RoleEntity } from "@/modules/role/entities";
import { UserEntity, UserRoleRelationEntity } from "@/modules/user/entities";
import { Logger } from "@nestjs/common";
import { I18nService } from "nestjs-i18n";
import { basename } from "path";
import { EntityTarget } from "typeorm";
import {
    createAccessTokenSql,
    createAdminApiPermissionRelationSql,
    createAdminApiSql,
    createElementPermissionRelationSql,
    createElementSql,
    createMenuPermissionRelationSql,
    createMenuSql,
    createOperatePermissionRelationSql,
    createOperateSql,
    createPermissionSql,
    createRefresTokenSql,
    createRoleGroupPermissionRelationSql,
    createRoleGroupRoleRelationSql,
    createRoleGroupSql,
    createRolePermissionRelationSql,
    createRoleSql,
    createUserRoleRelationSql,
    createUserSql,
    defaultAdminApi,
    defaultMenu,
    defaultOperate,
    defaultRole,
    defaultRoleGroup,
    defaultRoleGroupRoleRelation,
    defaultUser,
    defaultUserRoleRelation,
} from "./consts";
import { dbConfig, DB, DBInsert } from "./db";
import { initAdminApiData } from "./init-admin-api";
import { initMenuData } from "./init-menu";

export const initLogger = new Logger("db", { timestamp: true });

// 增加或更新自增加ID
const setSequence = (tablename: string, isInsert?: boolean) => {
    if (!isInsert) {
        // 更新自增加ID
        const sqlSequence = `UPDATE SQLITE_SEQUENCE SET seq=99 WHERE name="${tablename}";`;
        DB.query(sqlSequence);
    } else {
        // 新增加自增加ID
        const sqlSequence = `INSERT INTO SQLITE_SEQUENCE (name, seq) VALUES ("${tablename}", 99);`;
        DB.query(sqlSequence);
    }
};

// 创建表
export const createTable = async (tablename: string, createSql: string, i18n: I18nService) => {
    initLogger.log(i18n.t("init.createTable", { args: { tablename } }));
    await DB.query(createSql);
};
// 添加默认数据
export const addDefaultData = async (
    opt: { tablename: string; entity?: EntityTarget<object>; defaultData?: object[] },
    i18n: I18nService,
) => {
    const { tablename, entity, defaultData } = opt;
    initLogger.log(i18n.t("init.begainInitTable", { args: { tablename } }));
    // const respository = DB.getRepository(entity);
    // const data = await respository.insert(defaultData);
    const data = await DBInsert(entity, defaultData);
    // 更新自增加ID
    setSequence(tablename);
    initLogger.log(i18n.t("init.finishedInitTable", { args: { tablename } }));
    return data;
};

// 初始化默认用户，菜单，角色组，角色等
export async function initDefaultData(i18n: I18nService) {
    initLogger.log(i18n.t("init.begainInitDb"));
    // 数据库初始化
    try {
        // 建立连接池
        await DB.initialize();
        initLogger.log(i18n.t("init.dbConnected") + ` ${basename(dbConfig.database as string)}`);
        // 删除数据库及其所有数据
        await DB.dropDatabase();
        // 新建没有默认数据的表
        await Promise.all([
            // 令牌token
            createTable("access_token", createAccessTokenSql, i18n),
            createTable("refresh_token", createRefresTokenSql, i18n),
            // 创建权限表
            createTable("permission", createPermissionSql, i18n),
            // 页面api接口表
            createTable("admin_api", createAdminApiSql, i18n),
            // 页面元素表
            createTable("element", createElementSql, i18n),
            // 菜单表
            createTable("menu", createMenuSql, i18n),
            // 操作表
            createTable("operate", createOperateSql, i18n),
            // 角色表
            createTable("role", createRoleSql, i18n),
            // 角色组表-角色类型
            createTable("role_group", createRoleGroupSql, i18n),
            // 创建用户表
            createTable("user", createUserSql, i18n),
            // 用户组表
            // createTable("user_group", createUserGroupSql, i18n),
        ]);
        // 创建关联关系表
        await Promise.all([
            // 页面api接口表与权限表关联表
            createTable("admin_api_permission_relation", createAdminApiPermissionRelationSql, i18n),
            // 页面元素表与权限表关联表
            createTable("element_permission_relation", createElementPermissionRelationSql, i18n),
            // 菜单表与权限表关联表
            createTable("menu_permission_relation", createMenuPermissionRelationSql, i18n),
            // 操作表与权限表关联表
            createTable("operate_permission_relation", createOperatePermissionRelationSql, i18n),
            // 角色表与权限表关联表
            createTable("role_permission_relation", createRolePermissionRelationSql, i18n),
            // 角色组表和权限表关联表
            createTable("role_group_permission_relation", createRoleGroupPermissionRelationSql, i18n),
            // 角色组表和角色表关联表
            createTable("role_group_role_relation", createRoleGroupRoleRelationSql, i18n),
            // 用户表和角色表关联表
            createTable("user_role_relation", createUserRoleRelationSql, i18n),
            // 用户组表和用户表关联表
            // createTable("user_group_user_relation", createUserGroupUserRelationSql, i18n),
            // 用户组表和角色表关联表
            // createTable("user_group_role_relation", createUserGroupRoleRelationSql, i18n),
        ]);

        // 添加默认数据
        await Promise.all([
            // 角色组
            addDefaultData(
                {
                    tablename: "role_group",
                    entity: RoleGroupEntity,
                    defaultData: defaultRoleGroup,
                },
                i18n,
            ),
            // 角色
            addDefaultData(
                {
                    tablename: "role",
                    entity: RoleEntity,
                    defaultData: defaultRole,
                },
                i18n,
            ),
            // 用户
            addDefaultData(
                {
                    tablename: "user",
                    entity: UserEntity,
                    defaultData: defaultUser,
                },
                i18n,
            ),
            // 操作表
            addDefaultData(
                {
                    tablename: "operate",
                    entity: OperateEntity,
                    defaultData: defaultOperate,
                },
                i18n,
            ),
        ]);
        await Promise.all([
            // 添加默认关联关系表数据
            // 角色组表和角色表关联关系
            addDefaultData(
                {
                    tablename: "role_group_role_relation",
                    entity: RoleGroupRoleRelationEntity,
                    defaultData: defaultRoleGroupRoleRelation,
                },
                i18n,
            ),
            // 用户表和角色表关联表
            addDefaultData(
                {
                    tablename: "user_role_relation",
                    entity: UserRoleRelationEntity,
                    defaultData: defaultUserRoleRelation,
                },
                i18n,
            ),
            // 添加页面api权限
            initAdminApiData(defaultAdminApi, i18n),
            // 添加要隐藏的页面元素权限
            // initElementData(defaultElement, i18n),
            // 添加菜单权限
            initMenuData(defaultMenu, i18n),
        ]);
        // 数据库初始化结束
        initLogger.log(i18n.t("init.finishedInitDb"));
    } catch (error) {
        initLogger.log(i18n.t("init.initDbFailed"));
        console.log(error);
    }
}
