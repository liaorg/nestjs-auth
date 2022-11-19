import { RoleGroupEnum } from "@/modules/admin/role-group/enums";

// 页面Route接口
export interface AdminRouteInterface {
    // 路径 path 与 Controller 中的设置对应，每个方法一个路径
    path: string;
    // 可以有哪些操作类型 取值范围 ["GET", "POST", "DELETE", "PATCH", "PUT", "HEAD"];
    method: string;
    // 拥有权限的角色组id集合，*表示所有角色都有的操作
    roleGroup: "*" | RoleGroupEnum[];
}

// 添加页面route权限 admin_route admin_route_permission_relation
export const defaultAdminRoute: AdminRouteInterface[] = [
    // 用户管理
    // 登录
    { path: "/user/login", method: "POST", roleGroup: "*" },
    // 退出
    { path: "/user/logout", method: "GET", roleGroup: "*" },
    // 添加用户
    { path: "/user", method: "POST", roleGroup: [RoleGroupEnum.systemAdmin] },
    // 单个删除
    { path: "/user/:id", method: "DELETE", roleGroup: [RoleGroupEnum.systemAdmin] },
    // 批量删除 ?parma=base64(json({"id":[103,102]}))
    { path: "/user", method: "DELETE", roleGroup: [RoleGroupEnum.systemAdmin] },
    // 修改用户
    { path: "/user/:id", method: "PATCH", roleGroup: [RoleGroupEnum.systemAdmin] },
    // 用户列表-分页查询
    { path: "/user", method: "GET", roleGroup: [RoleGroupEnum.systemAdmin] },
    // 获取指定用户信息(包含角色)-用户管理
    { path: "/user/:id", method: "GET", roleGroup: [RoleGroupEnum.systemAdmin] },
    // 修改密码
    { path: "/user/password/:id", method: "PATCH", roleGroup: [RoleGroupEnum.systemAdmin] },
    // 重置密码
    { path: "/user/passwords", method: "PATCH", roleGroup: [RoleGroupEnum.systemAdmin] },
    // 获取用户信息-头部
    { path: "/user/profile", method: "GET", roleGroup: "*" },
    // 用户信息-头部修改
    { path: "/user/profile", method: "PATCH", roleGroup: "*" },
    // 角色管理
    { path: "/role/list", method: "GET", roleGroup: [RoleGroupEnum.systemAdmin] },
    { path: "/role", method: "POST", roleGroup: [RoleGroupEnum.systemAdmin] },
    // 单个删除
    { path: "/role/:id", method: "DELETE", roleGroup: [RoleGroupEnum.systemAdmin] },
    // 修改
    { path: "/role/:id", method: "PATCH", roleGroup: [RoleGroupEnum.systemAdmin] },
    { path: "/role", method: "GET", roleGroup: [RoleGroupEnum.systemAdmin] },
    { path: "/role/:id", method: "GET", roleGroup: [RoleGroupEnum.systemAdmin] },
    // 设置默认管理员
    { path: "/role/default-adminer/:id", method: "PATCH", roleGroup: [RoleGroupEnum.systemAdmin] },
    // 验证码
    { path: "/captcha", method: "GET", roleGroup: "*" },
];
