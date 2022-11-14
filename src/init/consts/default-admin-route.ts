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
    { path: "/user", method: "GET", roleGroup: [RoleGroupEnum.systemAdmin] },
    { path: "/user/:id", method: "GET", roleGroup: [RoleGroupEnum.systemAdmin] },
    { path: "/user/:id", method: "PATCH", roleGroup: [RoleGroupEnum.systemAdmin] },
    { path: "/user/:id", method: "DELETE", roleGroup: [RoleGroupEnum.systemAdmin] },
    { path: "/user/login", method: "POST", roleGroup: "*" },
    { path: "/user/logout", method: "GET", roleGroup: "*" },
    // 修改密码
    { path: "/user/password", method: "PATCH", roleGroup: "*" },
    // 用户信息
    { path: "/user/profile", method: "GET", roleGroup: "*" },
    // 设置默认管理员
    { path: "/user/default-adminer", method: "PATCH", roleGroup: [RoleGroupEnum.systemAdmin] },
    // 角色管理
    { path: "/role", method: "*", roleGroup: [RoleGroupEnum.systemAdmin] },
    // 验证码
    { path: "/captcha", method: "GET", roleGroup: "*" },
];
