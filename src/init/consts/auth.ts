// 表创建语句
// 所有表：SELECT name FROM sqlite_master WHERE type="table"
// 所有表的自增id：SELECT * FROM sqlite_sequence

// 访问令牌表 token表
export const createAccessTokenSql = `CREATE TABLE "main"."access_token" (
  "id" VARCHAR(36) NOT NULL PRIMARY KEY,
  "value" VARCHAR(500), -- token值
  "user_id" INTEGER, -- 用户id
  "expired_at" INTEGER NOT NULL, -- token过期时间
  "create_date" INTEGER NOT NULL,
  "update_date" INTEGER NOT NULL,
  CONSTRAINT "value" UNIQUE ("value" ASC),
  CONSTRAINT "fk_access_token_user_1" FOREIGN KEY ("user_id") REFERENCES "user" ("id")
);
CREATE UNIQUE INDEX "access_token_value"
ON "access_token" (
  "value" ASC
);`;
// 刷新令牌表 token表
export const createRefresTokenSql = `CREATE TABLE "main"."refresh_token" (
  "id" VARCHAR(36) NOT NULL PRIMARY KEY,
  "value" VARCHAR(500),
  "access_token_id" VARCHAR(36) NOT NULL,
  "expired_at" INTEGER NOT NULL,
  "create_date" INTEGER NOT NULL,
  "update_date" INTEGER NOT NULL,
  CONSTRAINT "value" UNIQUE ("value" ASC),
  CONSTRAINT "fk_refresh_token_access_token_1" FOREIGN KEY ("access_token_id") REFERENCES "access_token" ("id")
);
CREATE UNIQUE INDEX "refresh_token_value"
ON "refresh_token" (
  "value" ASC
);`;

// 权限表 与权限类型表一对一关系
export const createPermissionSql = `CREATE TABLE "main"."permission" (
  "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  "type" VARCHAR(30) NOT NULL -- 权限类型 menu admin_route element operate
);
CREATE INDEX "permission_type"
ON "permission" (
  "type" ASC
);`;

// 页面route接口表
export const createAdminRouteSql = `CREATE TABLE "main"."admin_route" (
  "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  "path" VARCHAR(100) NOT NULL, -- 接口URL路径
  "method" VARCHAR(20) NOT NULL -- 操作方法 GET,HEAD,PUT,PATCH,POST,DELETE
);
CREATE INDEX "admin_route_path"
ON "admin_route" (
  "path" ASC
);
CREATE INDEX "admin_route_method"
ON "admin_route" (
  "method" ASC
);`;
// 页面路由接口表与权限表关联表
export const createAdminRoutePermissionRelationSql = `CREATE TABLE "main"."admin_route_permission_relation" (
  "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  "admin_route_id" INTEGER NOT NULL,
  "permission_id" INTEGER NOT NULL,
  CONSTRAINT "fk_admin_route_permission_relation_admin_route_1" FOREIGN KEY ("admin_route_id") REFERENCES "admin_route" ("id"),
  CONSTRAINT "fk_admin_route_permission_relation_permission_1" FOREIGN KEY ("permission_id") REFERENCES "permission" ("id")
);`;

// 业务系统表与权限表关联表
export const createBusinessPermissionRelationSql = `CREATE TABLE "main"."business_permission_relation" (
  "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  "business_id" INTEGER NOT NULL,
  "permission_id" INTEGER NOT NULL,
  CONSTRAINT "fk_business_permission_relation_permission_1" FOREIGN KEY ("permission_id") REFERENCES "permission" ("id")
);`;

// 页面元素表，控制页面元素是否隐藏
export const createElementSql = `CREATE TABLE "main"."element" (
  "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  "node" VARCHAR(32) NOT NULL -- 元素id名
);`;
// 页面元素表与权限表关联表
export const createElementPermissionRelationSql = `CREATE TABLE "main"."element_permission_relation" (
  "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  "element_id" INTEGER NOT NULL,
  "permission_id" INTEGER NOT NULL,
  CONSTRAINT "fk_element_permission_relation_element_1" FOREIGN KEY ("element_id") REFERENCES "element" ("id"),
  CONSTRAINT "fk_element_permission_relation_permission_1" FOREIGN KEY ("permission_id") REFERENCES "permission" ("id")
);`;

// 菜单表
export const createMenuSql = `CREATE TABLE "main"."menu" (
  "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  "parent_id" INTEGER, -- 父菜单id
  "path" VARCHAR(150) NOT NULL, -- 菜单路由路径
  "name" VARCHAR(30) NULL, -- 菜单名称，可以做为前端组件名要大写开头
  "locale" VARCHAR(150), -- 本地化/国际化名称，对应 i18n 文件 menu.json 中的字段
  "requires_auth" TINYINT(2) NOT NULL DEFAULT 1, -- 是否需要登录鉴权requiresAuth 0-否|1-是
  "hide_in_menu" TINYINT(2) NOT NULL DEFAULT 0, -- 是否在菜单中隐藏该项hideInMenu 0-否|1-是
  "icon" VARCHAR(30), -- 图标
  "order" INTEGER, -- 排序值
  "status" TINYINT(2) NOT NULL DEFAULT 0 -- 状态：0-失效|1-有效|2-不可编辑
);`;
// 菜单表与权限表关联表
export const createMenuPermissionRelationSql = `CREATE TABLE "main"."menu_permission_relation" (
  "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  "menu_id" INTEGER NOT NULL,
  "permission_id" INTEGER NOT NULL,
  CONSTRAINT "fk_menu_permission__relation_menu_1" FOREIGN KEY ("menu_id") REFERENCES "menu" ("id"),
  CONSTRAINT "fk_menu_permission__relation_permission_1" FOREIGN KEY ("permission_id") REFERENCES "permission" ("id")
);`;

// 角色表
export const createRoleSql = `CREATE TABLE "main"."role" (
  "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  "name" VARCHAR(30) NOT NULL,
  "is_default" TINYINT(2) NOT NULL DEFAULT 0, -- 是否默认角色：0-否|1-是
  "status" TINYINT(2) NOT NULL DEFAULT 0, -- 状态：0-失效|1-有效|2-不可编辑
  "locale" VARCHAR(150), -- 本地化/国际化名称，对应 i18n 文件 role.json 中的字段
  "description" TEXT,
  "create_date" INTEGER NOT NULL,
  "update_date" INTEGER NOT NULL,
  CONSTRAINT "name" UNIQUE ("name" ASC)
);
CREATE UNIQUE INDEX "role_name"
ON "role" (
  "name" ASC
);`;
// 角色表与权限表关联表
export const createRolePermissionRelationSql = `CREATE TABLE "main"."role_permission_relation" (
  "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  "role_id" INTEGER NOT NULL,
  "permission_id" INTEGER NOT NULL,
  CONSTRAINT "fk_role_permission_relation_role_1" FOREIGN KEY ("role_id") REFERENCES "role" ("id"),
  CONSTRAINT "fk_role_permission_relation_permission_1" FOREIGN KEY ("permission_id") REFERENCES "permission" ("id")
);`;
// 默认角色
export const insertRoleSql = `INSERT INTO "main"."role"
(id, name, is_default, status, locale, create_date, update_date)
values(?, ?, ?, ?, ?, ?, ?);`;

// 角色组表-角色类型
export const createRoleGroupSql = `CREATE TABLE "main"."role_group" (
  "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  "type" TINYINT(2) NOT NULL, -- 角色组：1 systemAdmin 系统管理员 2 securityAdmin 业务安全员 3 auditAdmin 系统审计员
  "name" VARCHAR(30) NOT NULL,
  "locale" VARCHAR(150), -- 本地化/国际化名称，对应 i18n 文件 role-group.json 中的字段
  CONSTRAINT "type" UNIQUE ("type" ASC), -- 唯一值
  CONSTRAINT "name" UNIQUE ("name" ASC)
);
CREATE UNIQUE INDEX "role_group_type"
ON "role_group" (
  "type" ASC
);
CREATE UNIQUE INDEX "role_group_name"
ON "role_group" (
  "name" ASC
);`;
// 默认角色组
export const insertRoleGroupSql = `INSERT INTO "main"."role_group"
(id, type, name, locale)
values(?, ?, ?, ?);`;

// 角色组表和权限表关联表
// 一个角色只能属于一个角色组
export const createRoleGroupPermissionRelationSql = `CREATE TABLE "main"."role_group_permission_relation" (
  "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  "role_group_id" INTEGER NOT NULL,
  "permission_id" INTEGER NOT NULL,
  CONSTRAINT "fk_role_group_permission_relation_role_group_1" FOREIGN KEY ("role_group_id") REFERENCES "role_group" ("id"),
  CONSTRAINT "fk_role_group_permission_relation_permission_1" FOREIGN KEY ("permission_id") REFERENCES "permission" ("id")
);`;

// 角色组表和角色表关联表
export const createRoleGroupRoleRelationSql = `CREATE TABLE "main"."role_group_role_relation" (
  "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  "role_group_id" INTEGER NOT NULL,
  "role_id" INTEGER NOT NULL,
  CONSTRAINT "fk_role_group_role_relation_role_group_1" FOREIGN KEY ("role_group_id") REFERENCES "role_group" ("id"),
  CONSTRAINT "fk_role_group_role_relation_role_1" FOREIGN KEY ("role_id") REFERENCES "role" ("id")
);`;

// 创建用户表
export const createUserSql = `CREATE TABLE "main"."user" (
  "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  "name" VARCHAR(30) NOT NULL,
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
  CONSTRAINT "name" UNIQUE ("name" ASC)
);
CREATE UNIQUE INDEX "user_name"
ON "user" (
  "name" ASC
);`;
// 默认用户
export const insertUserSql = `INSERT INTO "main"."user"
(id, name, password, password_salt, is_default, status, create_date, update_date)
values(?, ?, ?, ?, ?, ?, ?, ?);`;

// 用户表和角色表关联表
// 一个用户只能属于一个角色
export const createUserRoleRelationSql = `CREATE TABLE "main"."user_role_relation" (
  "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  "user_id" INTEGER NOT NULL,
  "role_id" INTEGER NOT NULL,
  CONSTRAINT "fk_user_role_relation_user_1" FOREIGN KEY ("user_id") REFERENCES "user" ("id"),
  CONSTRAINT "fk_user_role_relation_role_1" FOREIGN KEY ("role_id") REFERENCES "role" ("id")
);`;

// 用户组表
export const createUserGroupSql = `CREATE TABLE "main"."user_group" (
  "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  "name" TEXT
);`;

// 用户组表和用户表关联表
// 一个用户只能属于一个用户组
export const createUserGroupUserRelationSql = `CREATE TABLE "main"."user_group_user_relation" (
  "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  "user_id" INTEGER NOT NULL,
  "group_id" INTEGER NOT NULL,
  CONSTRAINT "fk_user_group_user_users_1" FOREIGN KEY ("user_id") REFERENCES "user" ("id"),
  CONSTRAINT "fk_user_group_user_user_groups_1" FOREIGN KEY ("group_id") REFERENCES "user_group" ("id")
);`;

// 用户组表和角色表关联表
// 一个用户组只能属于一个角色
export const createUserGroupRoleRelationSql = `CREATE TABLE "main"."user_group_role_relation" (
  "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  "group_id" INTEGER NOT NULL,
  "role_id" INTEGER NOT NULL,
  CONSTRAINT "fk_user_group_role_relation_user_group_1" FOREIGN KEY ("group_id") REFERENCES "user_group" ("id"),
  CONSTRAINT "fk_user_group_role_relation_role_1" FOREIGN KEY ("role_id") REFERENCES "role" ("id")
);`;
