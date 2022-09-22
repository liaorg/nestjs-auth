import { defaultCommonRoutes } from "./common-routes.const";

// 默认系统日志审计员路由 roles 为系统日志审计员
export const defaultAuditAdminRoutes = [
    // 默认公共路由
    ...defaultCommonRoutes,
    // 系统管理
    {
        path: "/",
        meta: {
            // 对应 i18n 文件 routes.json 中的字段
            locale: "routes.systemAdmin",
            icon: "icon-settings",
            // 是否需要登录鉴权
            requiresAuth: true,
            // 排序路由菜单项
            order: 1,
        },
        // 应用路由
        children: [
            {
                // 操作日志,其他角色的操作日志
                path: "/operated-logs",
                name: "OperatedLog",
                meta: {
                    locale: "routes.operatedLogs",
                    order: 1,
                    requiresAuth: true,
                },
            },
        ],
    },
];
