// http 方法 OperateEnum
export const operateMethod = ["*", "GET", "POST", "DELETE", "PATCH", "PUT", "HEAD"];

// 添加页面api权限 admin_api admin_api_permission_relation
export const defaultAdminApi = [
    { path: "/login", method: "POST" },
    { path: "/logout", method: "POST" },
    { path: "/user", method: "*" },
    { path: "/user/password", method: "PATCH" },
    { path: "/user/default-adminer", method: "PATCH" },
    { path: "/role", method: "*" },
];
