import { RoutePermission } from "@/modules/routes/enums/route-permission.enum";
import { defaultCommonRoutes } from "./common-routes.const";

// 系统管理员-监控中心
const systemMonitor = [
    {
        // 运行状态
        path: "running-state",
        name: "RunningState",
        meta: {
            locale: "routes.runningState",
            order: 1,
            requiresAuth: true,
        },
    },
];
// 系统管理员-系统管理
const systemAdmin = [
    {
        // 用户管理
        path: "/users",
        // 名称，可以做为前端组件名要大写开头
        name: "Users",
        // 元数据
        meta: {
            // 对应 i18n 文件 routes.json 中的字段
            locale: "routes.users",
            // 排序路由菜单项
            order: 1,
            // 是否需要登录鉴权
            requiresAuth: true,
            // 页面操作/按钮权限
            // 页面操作中除了本路由操作以外的其他路由操作
            subactions: [
                {
                    // 用户管理-密码管理
                    path: "/users/passwords",
                    permission: [RoutePermission.PATCH],
                },
            ],
        },
    },
    {
        // 角色管理
        // 路径
        path: "/roles",
        // 名称，可以做为前端组件名
        name: "Roles",
        // 元数据
        meta: {
            // 对应 i18n 文件 routes.json 中的字段
            locale: "routes.roles",
            // 排序路由菜单项
            order: 2,
            // 是否需要登录鉴权
            requiresAuth: true,
            // 页面操作/按钮权限
            subactions: [
                {
                    // 角色管理-添加用户
                    path: "/roles/users",
                    // 操作权限就是对应的http操作方法：post|patch|delete|get
                    permission: [RoutePermission.POST],
                },
                {
                    // 角色管理-设置默认管理员
                    path: "/roles/defaultAdmin",
                    permission: [RoutePermission.PATCH],
                },
            ],
        },
    },
    {
        // 系统配置
        path: "/",
        // 名称，可以做为前端组件名
        // 这边不命名，表示默认显示嵌套路由中子路由中没有path的路由
        // name: "",
        // 元数据
        meta: {
            // 对应 i18n 文件 routes.json 中的字段
            locale: "routes.configures",
            // 图标
            icon: "icon-setting",
            // 排序路由菜单项
            order: 3,
            // 是否需要登录鉴权
            requiresAuth: true,
        },
        // 嵌套的子路由
        children: [
            {
                // 配置备份和还原
                path: "backup-restore",
                name: "BackupRestore",
                // 元数据
                meta: {
                    // 对应 i18n 文件 routes.json 中的字段
                    locale: "routes.backupAndRestore",
                    // 排序路由菜单项
                    order: 33,
                    // 是否需要登录鉴权
                    requiresAuth: true,
                },
            },
            {
                // 网卡配置
                path: "/networks",
                name: "Networks",
                // 元数据
                meta: {
                    // 对应 i18n 文件 routes.json 中的字段
                    locale: "routes.networks",
                    // 排序路由菜单项
                    order: 31,
                    // 是否需要登录鉴权
                    requiresAuth: true,
                },
            },
            {
                // 静态路由
                path: "/static-routes",
                name: "StaticRoutes",
                // 元数据
                meta: {
                    // 对应 i18n 文件 routes.json 中的字段
                    locale: "routes.staticRoutes",
                    // 排序路由菜单项
                    order: 32,
                    // 是否需要登录鉴权
                    requiresAuth: true,
                },
            },
            {
                // 系统安全配置
                path: "/security-configures",
                name: "SecurityConfigures",
                // 元数据
                meta: {
                    // 对应 i18n 文件 routes.json 中的字段
                    locale: "routes.securityConfigures",
                    // 排序路由菜单项
                    order: 34,
                    // 是否需要登录鉴权
                    requiresAuth: true,
                },
            },
        ],
    },
    {
        // 系统服务
        path: "/services",
        name: "Services",
        meta: {
            locale: "routes.services",
            order: 4,
            requiresAuth: true,
        },
    },
    {
        // 操作日志,日志审计员的操作日志
        path: "/audit-operated-logs",
        name: "AuditOperatedLog",
        meta: {
            locale: "routes.auditOperatedLog",
            order: 5,
            requiresAuth: true,
        },
    },
    {
        // 运行日志
        path: "/run-time-logs",
        name: "RunTimeLogs",
        meta: {
            locale: "routes.runTimeLogs",
            order: 6,
            requiresAuth: true,
        },
    },
    {
        // 系统信息
        path: "/system-profile",
        name: "SystemProfile",
        meta: {
            locale: "routes.systemProfile",
            order: 7,
            requiresAuth: true,
        },
    },
    {
        // 系统授权
        path: "/authorizations",
        name: "Authorizations",
        meta: {
            locale: "routes.authorizations",
            order: 8,
            requiresAuth: true,
            hideInMenu: true,
        },
    },
];

// 默认系统管理员角色路由 roles 为系统管理员
export const defaultSystemAdminRoutes = [
    // 默认公共路由
    ...defaultCommonRoutes,
    // 监控中心
    {
        path: "/",
        meta: {
            // 对应 i18n 文件 routes.json 中的字段
            locale: "menus.monitorCenter",
            icon: "icon-monitor",
            // 是否需要登录鉴权
            requiresAuth: true,
            // 排序路由菜单项
            order: 1,
            // 页面操作/按钮权限
            subactions: [],
        },
        // 应用路由
        children: [...systemMonitor],
    },
    // 系统管理
    {
        path: "/",
        meta: {
            // 对应 i18n 文件 routes.json 中的字段
            locale: "menus.systemAdmin",
            icon: "icon-settings",
            // 是否需要登录鉴权
            requiresAuth: true,
            // 排序路由菜单项
            order: 2,
        },
        // 应用路由
        children: [...systemAdmin],
    },
];
