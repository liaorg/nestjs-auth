import { RoleType } from "@/modules/role-types/enums";
import { RoleTypes, RoleTypesSchema } from "@/modules/role-types/schemas";
import { Roles, RolesSchema } from "@/modules/roles/schemas";
import { Users, UsersSchema } from "@/modules/users/schemas";
import { Logger } from "@nestjs/common";
import mongoose, { Schema } from "mongoose";
import { I18nService } from "nestjs-i18n";
import {
    defaultRoles,
    defaultUsers,
    defaultAuditAdminRoutes,
    defaultSystemAdminRoutes,
    defautlSecurityAdminRoutes,
} from "./consts";

interface IOpt {
    collection: string;
    name: string;
    schema: Schema;
    defaults: object;
}

// 初始化操作表，删除+填入初始化数据
async function dropAndCreate(db: mongoose.Connection, i18n: I18nService, opt: IOpt) {
    const { collection, name, schema, defaults } = opt;
    const logger = new Logger(collection, { timestamp: true });
    logger.log(i18n.t("init.begainInitCollection", { args: { collection } }));
    // 先尝试清空表再添加
    try {
        await db.dropCollection(collection);
    } catch (_error) {
        // logger.error(error);
    }
    // logger.log(i18n.t("init.deletedCollection", { args: { collection } }));
    // 添加
    const model = db.model(name, schema);
    try {
        return await model.insertMany(defaults);
    } catch (error) {
        logger.error(error);
    }
    logger.log(i18n.t("init.finishedInitCollection", { args: { collection } }));
}

// 提取路由中的路径
async function mapRoute(routes) {
    const routePath = [];
    routes.map(async (route) => {
        // 路由
        if (route.meta.requiresAuth) {
            route.path && route.name && routePath.push(route.path);
        }
        // 页面操作中除了本路由操作以外的其他路由操作
        if (route.meta?.subactions?.length) {
            route.meta.subactions.map((action) => {
                action.path && routePath.push(action.path);
            });
        }
        // 嵌套子路由
        if (route.children?.length) {
            const children = await mapRoute(route.children);
            routePath.push(...children);
        }
    });
    // console.log("routes", routePath);
    // 去重后返回
    return routePath;
}

export async function initDefaultData(db: mongoose.Connection, i18n: I18nService) {
    // 添加默认角色
    const rolesOpt: IOpt = {
        collection: "roles",
        name: Roles.name,
        schema: RolesSchema,
        defaults: defaultRoles,
    };
    // 增加默认角色的路由 routePath
    // requiresAuth=true 的路由 path
    // 系统管理员
    const systemAdminRoutes = await mapRoute(defaultSystemAdminRoutes);
    // 去重
    const newSystemAdminRoutes = [...new Set(systemAdminRoutes)];
    // console.log("systemAdminRoutes", systemAdminRoutes, newSystemAdminRoutes);
    defaultRoles[0].routePath = newSystemAdminRoutes;
    // 业务安全审计员
    const securityAdminRoutes = await mapRoute(defautlSecurityAdminRoutes);
    // 去重
    const newSecurityAdminRoutes = [...new Set(securityAdminRoutes)];
    defaultRoles[1].routePath = newSecurityAdminRoutes;
    // 系统日志审计员
    const auditAdminRoutes = await mapRoute(defaultAuditAdminRoutes);
    // 去重
    const newAuditAdminRoutes = [...new Set(auditAdminRoutes)];
    defaultRoles[2].routePath = newAuditAdminRoutes;
    const roles = await dropAndCreate(db, i18n, rolesOpt);

    // 添加默认角色类型及其路由
    const defaultRoutes = [
        // 系统管理员
        { roleType: RoleType.systemAdmin, name: "roleTypes.systemAdmin", routes: defaultSystemAdminRoutes },
        // 业务安全审计员
        { roleType: RoleType.securityAdmin, name: "roleTypes.securityAdmin", routes: defautlSecurityAdminRoutes },
        // 系统日志审计员
        { roleType: RoleType.auditAdmin, name: "roleTypes.auditAdmin", routes: defaultAuditAdminRoutes },
    ];
    // 添加路由属于角色
    const roleTypesOpt: IOpt = {
        collection: "role_types",
        name: RoleTypes.name,
        schema: RoleTypesSchema,
        defaults: defaultRoutes,
    };
    await dropAndCreate(db, i18n, roleTypesOpt);

    // 添加默认用户
    // 系统管理员
    // 增加默认用户所属角色的 ObjectId
    defaultUsers[0].role = roles[0]["_id"].toString();
    defaultUsers[0].rolename = roles[0]["rolename"];
    defaultUsers[0].roleType = roles[0]["roleType"];
    // 增加默认用户路由 routePath
    defaultUsers[0].routePath = systemAdminRoutes;
    // 业务安全审计员
    defaultUsers[1].role = roles[1]["_id"].toString();
    defaultUsers[1].rolename = roles[1]["rolename"];
    defaultUsers[1].roleType = roles[1]["roleType"];
    defaultUsers[1].routePath = securityAdminRoutes;
    // 系统日志审计员
    defaultUsers[2].role = roles[2]["_id"].toString();
    defaultUsers[2].rolename = roles[2]["rolename"];
    defaultUsers[2].roleType = roles[2]["roleType"];
    defaultUsers[2].routePath = auditAdminRoutes;

    const usersOpt: IOpt = {
        collection: "users",
        name: Users.name,
        schema: UsersSchema,
        defaults: defaultUsers,
    };
    await dropAndCreate(db, i18n, usersOpt);
}
