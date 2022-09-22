// 默认公共路由
export const defaultCommonRoutes = [
    {
        // 登录
        path: "/login",
        // 名称，可以做为前端组件名要大写开头
        name: "Login",
        meta: {
            // 对应 i18n 文件 routes.json 中的字段
            locale: "routes.login",
            // 是否需要登录鉴权
            requiresAuth: false,
            // 是否在左侧菜单中隐藏该项
            hideInMenu: true,
        },
    },
    {
        // 退出登录
        path: "/logout",
        name: "Logout",
        meta: {
            // 对应 i18n 文件 routes.json 中的字段
            locale: "routes.logout",
            // 是否需要登录鉴权
            requiresAuth: true,
            // 是否在左侧菜单中隐藏该项
            hideInMenu: true,
        },
    },
    {
        // 获取菜单
        path: "/route-menus",
        name: "RouteMenus",
        meta: {
            // 对应 i18n 文件 routes.json 中的字段
            locale: "routes.menus",
            // 是否需要登录鉴权
            requiresAuth: true,
            // 是否在左侧菜单中隐藏该项
            hideInMenu: true,
        },
    },
];
