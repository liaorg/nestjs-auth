// 添加菜单权限 menu menu_permission_relation
// 监控中心
const monitorCenter = [
    {
        // 运行状态
        path: "running-state",
        name: "RunningState",
        locale: "menu.runningState",
        order: 1,
    },
];
// 系统管理员-系统管理
const systemAdminCenter = [
    {
        // 用户管理
        path: "/user",
        name: "User",
        locale: "menu.user",
        order: 1,
    },
    {
        // 角色管理
        path: "/role",
        name: "Role",
        locale: "menu.role",
        order: 2,
    },
    {
        // 配置管理
        path: "/system-configure",
        locale: "menu.systemConfigure",
        icon: "icon-setting",
        order: 3,
        // 嵌套的子菜单
        children: [
            {
                // 网卡配置
                path: "/network",
                name: "Network",
                locale: "menu.network",
                order: 31,
            },
            {
                // 静态路由
                path: "/static-route",
                name: "StaticRoute",
                locale: "menu.staticRoute",
                order: 32,
            },
            {
                // 配置备份和还原
                path: "backup-restore",
                name: "BackupRestore",
                locale: "menu.backupAndRestore",
                order: 33,
            },
            {
                // 系统安全配置
                path: "/security-configure",
                name: "SecurityConfigure",
                locale: "menu.securityConfigure",
                order: 34,
            },
            {
                // 响应配置
                path: "/response-configure",
                name: "ResponseConfigure",
                locale: "menu.responseConfigure",
                order: 35,
            },
            {
                // 时间配置
                path: "/time-configure",
                name: "TimeConfigure",
                locale: "menu.timeConfigure",
                order: 36,
            },
        ],
    },
    {
        // 系统服务和维护
        path: "/service-maintain",
        name: "ServiceAndMaintain",
        locale: "menu.serviceAndMaintain",
        order: 4,
    },
    {
        // 操作日志,日志审计员的操作日志
        path: "/audit-operated-log",
        name: "AuditOperatedLog",
        locale: "menu.auditOperatedLog",
        order: 5,
    },
    {
        // 运行日志
        path: "/runtime-log",
        name: "RuntimeLog",
        locale: "menu.runtimeLog",
        order: 6,
    },
    {
        // 系统信息
        path: "/system-profile",
        name: "SystemProfile",
        locale: "menu.systemProfile",
        order: 7,
    },
];
export const defaultMenu = [
    {
        // 监控中心
        path: "/monitor-center",
        locale: "menu.monitorCenter",
        icon: "icon-monitor",
        order: 2,
        children: [...monitorCenter],
    },
    {
        // 审计中心
        path: "/audit-center",
        locale: "menu.auditCenter",
        icon: "icon-settings",
        order: 3,
        // children: [...auditCenter],
    },
    {
        // 数据分析中心
        path: "/analysis-center",
        locale: "menu.analysisCenter",
        icon: "icon-settings",
        order: 4,
        // children: [...analysisCenter],
    },
    {
        // 策略中心
        path: "/strategy-center",
        locale: "menu.strategyCenter",
        icon: "icon-settings",
        order: 5,
        // children: [...strategyCenter],
    },
    {
        // 系统管理
        path: "/system-admin-center",
        locale: "menu.systemAdminCenter",
        icon: "icon-settings",
        order: 6,
        children: [...systemAdminCenter],
    },
    {
        // 部署管理
        path: "/deploy-admin",
        locale: "menu.deployAdmin",
        icon: "icon-settings",
        order: 7,
        // children: [...deployAdmin],
    },
];
