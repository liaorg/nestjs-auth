import { RoleType } from "@/modules/role-types/enums";

// 系统默认角色
export const defaultRoles = [
    {
        // 角色名
        rolename: "roleTypes.systemAdmin",
        // 是否默认角色
        isDefaultRole: true,
        // 默认管理员
        defaultAdminer: "admin",
        // 角色类型 enum:RoleType {systemAdmin = 1,securityAdmin = 2,auditAdmin = 3,}
        roleType: RoleType.systemAdmin,
        // 角色所属路由, 对应 Controller 中定义的请求方法
        routePath: [],
        // 状态 0-失效|1-有效|2-不可编辑
        status: 2,
    },
    {
        rolename: "roleTypes.securityAdmin",
        isDefaultRole: true,
        defaultAdminer: "sec",
        roleType: RoleType.securityAdmin,
        routePath: [],
        status: 2,
    },
    {
        rolename: "roleTypes.auditAdmin",
        isDefaultRole: true,
        defaultAdminer: "audit",
        roleType: RoleType.auditAdmin,
        routePath: [],
        status: 2,
    },
];
