import { RoleGroupEnum } from "@/modules/admin/role-group/enums";

// 角色组
interface RoleGropInterface {
    id: RoleGroupEnum;
    // 角色类型
    type: RoleGroupEnum;
    // 角色组名
    name: string;
    // 本地化/国际化名称，对应 i18n 文件 roleGroup.json 中的字段
    local: string;
}
// 默认角色组id
export const defaultRoleGroupId = [
    RoleGroupEnum.systemAdmin,
    RoleGroupEnum.securityAdmin,
    RoleGroupEnum.auditAdmin,
];
// 默认角色组
export const defaultRoleGroup: RoleGropInterface[] = [
    {
        // 系统管理员组
        id: RoleGroupEnum.systemAdmin,
        type: RoleGroupEnum.systemAdmin,
        name: "systemAdmin",
        local: "roleGroup.systemAdmin",
    },
    {
        // 业务安全员组
        id: RoleGroupEnum.securityAdmin,
        type: RoleGroupEnum.securityAdmin,
        name: "securityAdmin",
        local: "roleGroup.securityAdmin",
    },
    {
        // 系统审计员组
        id: RoleGroupEnum.auditAdmin,
        type: RoleGroupEnum.auditAdmin,
        name: "auditAdmin",
        local: "roleGroup.auditAdmin",
    },
];
// 角色
interface RoleInterface {
    id: RoleGroupEnum;
    // 角色组名
    name: string;
    // 是否默认角色
    isDefault: boolean;
    // 角色组即角色类型id
    roleGroupId: number;
    // 状态：0-失效|1-有效|2-不可编辑
    status: number;
    // 本地化/国际化名称，对应 i18n 文件 role.json 中的字段
    local: string;
}
// 默认角色
export const defaultRole: RoleInterface[] = [
    // 默认系统管理员
    {
        id: RoleGroupEnum.systemAdmin,
        name: "defaultSystemAdmin",
        isDefault: true,
        roleGroupId: RoleGroupEnum.systemAdmin,
        status: 1,
        local: "role.defaultSystemAdmin",
    },
    // 默认业务安全员
    {
        id: RoleGroupEnum.securityAdmin,
        name: "defaultSecurityAdmin",
        isDefault: true,
        roleGroupId: RoleGroupEnum.securityAdmin,
        status: 1,
        local: "role.defaultSecurityAdmin",
    },
    // 默认系统审计员
    {
        id: RoleGroupEnum.auditAdmin,
        name: "defaultAuditAdmin",
        isDefault: true,
        roleGroupId: RoleGroupEnum.auditAdmin,
        status: 1,
        local: "role.defaultAuditAdmin",
    },
];
// 角色组表和角色表关联表
export const defaultRoleGroupRoleRelation = [
    { id: 1, roleGroupId: RoleGroupEnum.systemAdmin, roleId: RoleGroupEnum.systemAdmin },
    { id: 2, roleGroupId: RoleGroupEnum.securityAdmin, roleId: RoleGroupEnum.securityAdmin },
    { id: 3, roleGroupId: RoleGroupEnum.auditAdmin, roleId: RoleGroupEnum.auditAdmin },
];
