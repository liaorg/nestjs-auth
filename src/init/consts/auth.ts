import { getUTCTime } from "@/common/utils";
import { RoleType } from "@/modules/role-types/enums";
import { randomBytes, scryptSync } from "crypto";

// 当前时间戳
const now = getUTCTime();
const timestamp = now.unix();

// 所有表：SELECT name FROM sqlite_master WHERE type="table"
// 所有表的自增id：SELECT * FROM sqlite_sequence

// 角色类型表
export const createRoleTypeSql = `CREATE TABLE IF NOT EXISTS "role_types" (
  "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  "type" TINYINT(2) NOT NULL, -- 角色类型：1 systemAdmin 系统管理员 2 securityAdmin 业务安全员 3 auditAdmin 系统审计员
  "name" VARCHAR(30) NOT NULL,
  "description" TEXT,
  "create_date" INTEGER NOT NULL,
  "update_date" INTEGER NOT NULL,
  CONSTRAINT "type" UNIQUE ("type" ASC), -- 唯一值
  CONSTRAINT "name" UNIQUE ("name" ASC)
);

CREATE UNIQUE INDEX "role_types_type"
ON "role_types" (
  "type" ASC
);
CREATE UNIQUE INDEX "role_types_name"
ON "role_types" (
  "name" ASC
);`;

// 默认角色类型
export const insertRoleTypeSql = `INSERT INTO "role_types"
(id, type, name, create_date, update_date)
values(?, ?, ?, ?, ?);`;
export const defaultRoleType = [
    {
        id: RoleType.systemAdmin,
        type: RoleType.systemAdmin,
        name: "roles.systemAdmin",
        createDate: timestamp,
        updateDate: timestamp,
    },
    {
        id: RoleType.securityAdmin,
        type: RoleType.securityAdmin,
        name: "roles.securityAdmin",
        createDate: timestamp,
        updateDate: timestamp,
    },
    {
        id: RoleType.auditAdmin,
        type: RoleType.auditAdmin,
        name: "roles.auditAdmin",
        createDate: timestamp,
        updateDate: timestamp,
    },
];

// 创建角色表
export const createRoleSql = `CREATE TABLE IF NOT EXISTS "roles" (
  "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  "role_type_id" INTEGER NOT NULL, -- 角色类型id
  "rolename" VARCHAR(30) NOT NULL,
  "is_default" TINYINT(2) NOT NULL DEFAULT 0, -- 是否默认角色：0-否|1-是
  "status" TINYINT(2) NOT NULL DEFAULT 0, -- 状态：0-失效|1-有效|2-不可编辑
  "description" TEXT,
  "create_date" INTEGER NOT NULL,
  "update_date" INTEGER NOT NULL,
  CONSTRAINT "role_type_id" FOREIGN KEY ("role_type_id") REFERENCES "role_types" ("id"), -- 外键
  CONSTRAINT "rolename" UNIQUE ("rolename" ASC)
);

CREATE UNIQUE INDEX "roles_rolename"
ON "roles" (
  "rolename" ASC
);
CREATE INDEX "roles_role_type_id"
ON "roles" (
  "role_type_id" ASC
);
CREATE INDEX "roles_status"
ON "roles" (
  "status" ASC
);`;

// 默认角色
export const insertRoleSql = `INSERT INTO "roles"
(id, role_type_id, rolename, is_default, status, create_date, update_date)
values(?, ?, ?, ?, ?, ?, ?);`;
export const defaultRole = [
    // 默认系统管理员
    {
        id: RoleType.systemAdmin,
        roleTypeId: RoleType.systemAdmin,
        rolename: "roles.defaultSystemAdmin",
        isDefault: true,
        status: 1,
        createDate: timestamp,
        updateDate: timestamp,
    },
    // 默认业务安全员
    {
        id: RoleType.securityAdmin,
        roleTypeId: RoleType.securityAdmin,
        rolename: "roles.defaultSecurityAdmin",
        isDefault: true,
        status: 1,
        createDate: timestamp,
        updateDate: timestamp,
    },
    // 默认系统审计员
    {
        id: RoleType.auditAdmin,
        roleTypeId: RoleType.auditAdmin,
        rolename: "roles.defaultAuditAdmin",
        isDefault: true,
        status: 1,
        createDate: timestamp,
        updateDate: timestamp,
    },
];

// 创建用户表
export const createUserSql = `CREATE TABLE IF NOT EXISTS "users" (
  "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  "role_id" INTEGER NOT NULL,
  "username" VARCHAR(30) NOT NULL,
  "password" VARCHAR(255) NOT NULL,
  "password_salt" VARCHAR(255) NOT NULL,
  "is_default" TINYINT(2) NOT NULL DEFAULT 0, -- 是否默认管理员：0-否|1-是
  "status" TINYINT(2) NOT NULL DEFAULT 0, -- 状态：0-失效|1-有效|2-不可编辑
  "description" TEXT,
  "email" VARCHAR(255),
  "full_name" VARCHAR(255), -- 真实姓名
  "gender" TINYINT(2), -- 性别：0-未知|1-男|2-女
  "department" VARCHAR(255), -- 部门
  "duty" VARCHAR(255), -- 职务
  "id_number" VARCHAR(30), -- 身份证号
  "phone_number" INTEGER, -- 手机号
  "qq" INTEGER,
  "create_date" INTEGER NOT NULL,
  "update_date" INTEGER NOT NULL,
  CONSTRAINT "role_id" FOREIGN KEY ("role_id") REFERENCES "roles" ("id"),
  CONSTRAINT "username" UNIQUE ("username" ASC)
);

CREATE UNIQUE INDEX "username"
ON "users" (
  "username" ASC
);
CREATE INDEX "users_role_id"
ON "users" (
  "role_id" ASC
);
CREATE INDEX "users_status"
ON "users" (
  "status" ASC
);`;

// 默认用户
export const insertUserSql = `INSERT INTO "users"
(id, role_id, username, password, password_salt, is_default, status, create_date, update_date)
values(?, ?, ?, ?, ?, ?, ?, ?, ?);`;

// 生成盐值
const createSalt = (size: number) => randomBytes(size).toString("hex");
// 生成密码
const createPassword = (password: string, salt: string) => {
    // 加密密码
    return scryptSync(password, salt, 64).toString("hex");
};

// 默认密码
// 当前年份
const year = now.year();
// 盐值长度
const size = 16;
const defaultAdmin = {
    systemAdmin: {
        username: "admin",
        password: `Admin@${year}`,
        passwordSalt: createSalt(size),
    },
    securityAdmin: {
        username: "sec",
        password: `Sec@${year}`,
        passwordSalt: createSalt(size),
    },
    auditAdmin: {
        username: "audit",
        password: `Audit@${year}`,
        passwordSalt: createSalt(size),
    },
};
defaultAdmin.systemAdmin.password = createPassword(
    defaultAdmin.systemAdmin.password,
    defaultAdmin.systemAdmin.passwordSalt,
);
defaultAdmin.securityAdmin.password = createPassword(
    defaultAdmin.securityAdmin.password,
    defaultAdmin.securityAdmin.passwordSalt,
);
defaultAdmin.auditAdmin.password = createPassword(
    defaultAdmin.auditAdmin.password,
    defaultAdmin.auditAdmin.passwordSalt,
);

export const defaultUser = [
    // 默认系统管理员
    {
        id: 1,
        roleId: RoleType.systemAdmin,
        ...defaultAdmin.systemAdmin,
        isDefault: true,
        status: 1,
        createDate: timestamp,
        updateDate: timestamp,
    },
    // 默认业务安全员
    {
        id: 2,
        roleId: RoleType.securityAdmin,
        ...defaultAdmin.securityAdmin,
        isDefault: true,
        status: 1,
        createDate: timestamp,
        updateDate: timestamp,
    },
    // 默认系统审计员
    {
        id: 3,
        roleId: RoleType.auditAdmin,
        ...defaultAdmin.auditAdmin,
        isDefault: true,
        status: 1,
        createDate: timestamp,
        updateDate: timestamp,
    },
];

// 登录 token
export const createAccessTokenSql = `CREATE TABLE "access_tokens" (
  "id" VARCHAR(36) NOT NULL PRIMARY KEY,
  "value" VARCHAR(500), -- token值
  "userid" INTEGER, -- 用户id
  "expired_at" INTEGER NOT NULL, -- token过期时间
  "create_date" INTEGER NOT NULL,
  "update_date" INTEGER NOT NULL,
  CONSTRAINT "userid" FOREIGN KEY ("userid") REFERENCES "users" ("id")
);
CREATE UNIQUE INDEX "access_tokens_value"
ON "access_tokens" (
  "value" ASC
);`;
export const createRefresTokenSql = `CREATE TABLE "refresh_tokens" (
  "id" VARCHAR(36) NOT NULL PRIMARY KEY,
  "value" VARCHAR(500), -- token值
  "access_token_id" INTEGER,
  "expired_at" INTEGER NOT NULL, -- token过期时间
  "create_date" INTEGER NOT NULL,
  "update_date" INTEGER NOT NULL,
  CONSTRAINT "access_token_id" FOREIGN KEY ("access_token_id") REFERENCES "access_tokens" ("id")
);
CREATE UNIQUE INDEX "refresh_tokens_value"
ON "refresh_tokens" (
  "value" ASC
);
CREATE UNIQUE INDEX "refresh_tokens_access_token_id"
ON "refresh_tokens" (
  "access_token_id" ASC
);`;

// 创建路由菜单表
export const createRouteSql = `CREATE TABLE IF NOT EXISTS "routes" (
  "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  "role_id" VARCHAR(255), -- 所属角色id：用逗号分隔
  "parent_id" INTEGER, -- 父路由
  "path" VARCHAR(255) NOT NULL, -- 路由路径
  "name" VARCHAR(30) NULL, -- 路由名称，可以做为前端组件名要大写开头
  "locale" VARCHAR(255), -- 本地化/国际化名称，对应 i18n 文件 routes.json 中的字段
  "requires_auth" TINYINT(2), -- 是否需要登录鉴权requiresAuth 0-否|1-是
  "hide_in_menu" TINYINT(2), -- 是否在菜单中隐藏该项hideInMenu 0-否|1-是
  "icon" VARCHAR(30), -- 图标
  "order" INTEGER, -- 排序值
  "is_sub_action" TINYINT(2) NOT NULL DEFAULT 0, -- 是否页面操作：0-否|1-是
  "sub_action_permission" VARCHAR(255), -- 操作权限就是对应的http操作方法：*或者post|patch|delete|get，用逗号分隔
  "status" TINYINT(2) NOT NULL DEFAULT 0, -- 状态：0-失效|1-有效|2-不可编辑
  "description" TEXT,
  "create_date" INTEGER NOT NULL,
  "update_date" INTEGER NOT NULL,
  CONSTRAINT "name" UNIQUE ("name" ASC)
);

CREATE INDEX "routes_path"
ON "routes" (
  "path" ASC
);
CREATE INDEX "routes_role_id"
ON "routes" (
  "role_id" ASC
);
CREATE INDEX "routes_parent_id"
ON "routes" (
  "parent_id" ASC
);
CREATE INDEX "routes_status"
ON "routes" (
  "status" ASC
);`;
// 默认路由
export const insertRouteSql = `INSERT INTO "routes"
(id, role_id, parent_id, path, name, locale, requires_auth, hide_in_menu, icon, order, permission, status, is_subactions, create_date, update_date)
values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;

// 一级路由
const topRoute = [
    {
        // 登录
        id: 1,
        // 所属角色id
        roleId: null,
        // 父路由
        parentId: null,
        // 路径
        path: "/login",
        // 名称，可以做为前端组件名要大写开头
        name: "Login",
        // 对应 i18n 文件 routes.json 中的字段
        locale: "routes.login",
        // 是否需要登录鉴权
        requiresAuth: false,
        // 是否在左侧菜单中隐藏该项
        hideInMenu: true,
        // 图标
        icon: null,
        // 排序值
        order: 0,
        // 操作权限就是对应的http操作方法：*或者post|patch|delete|get，用逗号分隔
        permission: null,
        // 状态：0-失效|1-有效|2-不可编辑
        status: 1,
        // 是否页面操作：0-否|1-是
        isSubactions: 0,
        createDate: timestamp,
        updateDate: timestamp,
    },
    {
        // 退出登录
        id: 2,
        roleId: null,
        parentId: null,
        path: "/logout",
        name: "Logout",
        locale: "routes.logout",
        requiresAuth: false,
        hideInMenu: true,
        icon: null,
        order: 0,
        permission: null,
        status: 1,
        isSubactions: 0,
        createDate: timestamp,
        updateDate: timestamp,
    },
];

export const defaultRoute = [...topRoute];
