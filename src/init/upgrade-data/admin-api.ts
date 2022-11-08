// 可以有哪些操作类型 取值范围 ["*", "GET", "POST", "DELETE", "PATCH", "PUT", "HEAD"];
// method: string;
// 拥有权限的角色组id集合，*表示所有角色都有的操作
// roleGroup: "*" | RoleGroupEnum[];

import { AdminApiInterface } from "../consts";

// 添加页面api权限 admin_api admin_api_permission_relation
export const adminApiData: AdminApiInterface[] = [
    // 测试功能
    { path: "/test", method: "GET", roleGroup: "*" },
];
