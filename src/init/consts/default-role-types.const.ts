import { RoleType } from "@/modules/role-types/enums";

// 默认角色
// 角色类型默认数据
export const defaultRoleTypes = [
    {
        // 角色类型
        roleType: RoleType.systemAdmin,
        // 角色类型名 系统管理员
        name: "roletypes.systemAdmin",
        // 角色类型的基本菜单权限
        routes: [],
        // 状态：0-失效|1-有效
        status: 1,
    },
    {
        // 角色类型
        roleType: RoleType.securityAdmin,
        // 角色类型名 系统安全员
        name: "roletypes.securityAdmin",
        // 角色类型的基本菜单权限
        routes: [],
        // 状态：0-失效|1-有效
        status: 1,
    },
    {
        // 角色类型
        roleType: RoleType.auditAdmin,
        // 角色类型名 系统审计员
        name: "roletypes.auditAdmin",
        // 角色类型的基本菜单权限
        routes: [],
        // 状态：0-失效|1-有效
        status: 1,
    },
];
