// 添加菜单权限 menu menu_permission_relation

import { RoleGroupEnum } from "@/modules/admin/role-group/enums";

// 菜单接口
export interface MenuInterface {
    // 路径
    path: string;
    // 菜单名称，可以做为前端组件名要大写开头
    name?: string;
    // 本地化/国际化名称，对应 i18n 文件 menu.json 中的字段
    local: string;
    // 排序值
    order: number;
    // 图标
    icon?: string;
    // 拥有权限的角色组id集合，*表示所有角色都有的操作
    roleGroup?: "*" | RoleGroupEnum[];
    // 嵌套的子菜单
    children?: MenuInterface[];
    // 父ID
    parentId?: number;
}

// 监控中心
const monitorCenter: MenuInterface[] = [
    {
        // 运行状态
        path: "running-state",
        name: "RunningState",
        local: "menu.runningState",
        order: 1,
        roleGroup: [RoleGroupEnum.systemAdmin, RoleGroupEnum.securityAdmin],
    },
    {
        // 数据库运维分析
        path: "database-operation",
        name: "DatabaseOperation",
        local: "menu.databaseOperation",
        order: 1,
        roleGroup: [RoleGroupEnum.securityAdmin],
    },
];
// 系统管理员-系统管理
const systemAdminCenter: MenuInterface[] = [
    {
        // 用户管理
        path: "/user",
        name: "User",
        local: "menu.user",
        order: 1,
    },
    {
        // 角色管理
        path: "/role",
        name: "Role",
        local: "menu.role",
        order: 2,
    },
    {
        // 配置管理
        path: "/system-configure",
        local: "menu.systemConfigure",
        icon: "icon-setting",
        order: 3,
        // 嵌套的子菜单
        children: [
            {
                // 网卡配置
                path: "/network",
                name: "Network",
                local: "menu.network",
                order: 31,
            },
            {
                // 静态路由
                path: "/static-route",
                name: "StaticRoute",
                local: "menu.staticRoute",
                order: 32,
            },
            {
                // 配置备份和还原
                path: "backup-restore",
                name: "BackupRestore",
                local: "menu.backupAndRestore",
                order: 33,
            },
            {
                // 系统安全配置
                path: "/security-configure",
                name: "SecurityConfigure",
                local: "menu.securityConfigure",
                order: 34,
            },
            {
                // 响应配置
                path: "/response-configure",
                name: "ResponseConfigure",
                local: "menu.responseConfigure",
                order: 35,
            },
            {
                // 时间配置
                path: "/time-configure",
                name: "TimeConfigure",
                local: "menu.timeConfigure",
                order: 36,
            },
        ],
    },
    {
        // 系统服务和维护
        path: "/service-maintain",
        name: "ServiceAndMaintain",
        local: "menu.serviceAndMaintain",
        order: 4,
    },
    {
        // 操作日志,日志审计员的操作日志
        path: "/audit-operated-log",
        name: "AuditOperatedLog",
        local: "menu.auditOperatedLog",
        order: 5,
    },
    {
        // 运行日志
        path: "/runtime-log",
        name: "RuntimeLog",
        local: "menu.runtimeLog",
        order: 6,
    },
    {
        // 系统信息
        path: "/system-profile",
        name: "SystemProfile",
        local: "menu.systemProfile",
        order: 7,
    },
];
export const defaultMenu: MenuInterface[] = [
    {
        // 监控中心
        path: "/monitor-center",
        local: "menu.monitorCenter",
        icon: "icon-monitor",
        order: 2,
        roleGroup: [RoleGroupEnum.systemAdmin, RoleGroupEnum.securityAdmin],
        children: [...monitorCenter],
    },
    {
        // 审计中心
        path: "/audit-center",
        local: "menu.auditCenter",
        icon: "icon-settings",
        order: 3,
        roleGroup: [RoleGroupEnum.securityAdmin],
        // children: [...auditCenter],
    },
    {
        // 数据分析中心
        path: "/analysis-center",
        local: "menu.analysisCenter",
        icon: "icon-settings",
        order: 4,
        roleGroup: [RoleGroupEnum.securityAdmin],
        // children: [...analysisCenter],
    },
    {
        // 策略中心
        path: "/strategy-center",
        local: "menu.strategyCenter",
        icon: "icon-settings",
        order: 5,
        roleGroup: [RoleGroupEnum.securityAdmin],
        // children: [...strategyCenter],
    },
    {
        // 系统管理
        path: "/system-admin-center",
        local: "menu.systemAdminCenter",
        icon: "icon-settings",
        order: 6,
        roleGroup: [RoleGroupEnum.systemAdmin],
        children: [...systemAdminCenter],
    },
    {
        // 部署管理
        path: "/deploy-admin",
        local: "menu.deployAdmin",
        icon: "icon-settings",
        order: 7,
        roleGroup: [RoleGroupEnum.securityAdmin],
        // children: [...deployAdmin],
    },
    {
        // 系统日志
        path: "/system-log",
        local: "menu.systemLog",
        icon: "icon-logs",
        order: 8,
        roleGroup: [RoleGroupEnum.systemAdmin, RoleGroupEnum.auditAdmin],
        // children: [...deployAdmin],
    },
];
