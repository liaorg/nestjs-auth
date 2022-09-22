import { defaultCommonRoutes } from "./common-routes.const";

// 业务安全审计员-监控中心
const securityMonitor = [
    {
        // 运行状态, 业务数据的
        path: "/vocational-state",
        name: "VocationalState",
        meta: {
            locale: "routes.vocationalState",
            order: 1,
            requiresAuth: true,
        },
    },
    {
        // 安全态势
        path: "/situations",
        name: "Situations",
        meta: {
            locale: "routes.situations",
            order: 2,
            requiresAuth: true,
        },
    },
];
// 业务安全审计员-审计中心
const auditCenter = [
    {
        // 语句查询
        path: "/sql",
        name: "Sql",
        meta: {
            locale: "routes.sql",
            order: 1,
            requiresAuth: true,
        },
    },
    {
        // 事件查询
        path: "/events",
        name: "Events",
        meta: {
            locale: "routes.events",
            order: 2,
            requiresAuth: true,
        },
    },
    {
        // SQL模板
        path: "/sql-tempates",
        name: "SqlTempates",
        meta: {
            locale: "routes.sqlTempates",
            order: 3,
            requiresAuth: true,
        },
    },
    {
        // 因子监测
        path: "/factor-auto-discover",
        name: "FactorAutoDiscover",
        meta: {
            locale: "routes.factorAutoDiscover",
            order: 4,
            requiresAuth: true,
        },
    },
];

// 业务安全审计员-数据分析中心
const analysisCenter = [
    {
        // 报表查看
        path: "/reports",
        name: "Reports",
        meta: {
            locale: "routes.reports",
            order: 1,
            requiresAuth: true,
        },
    },
    {
        // 报表任务
        path: "/report-tasks",
        name: "ReportTasks",
        meta: {
            locale: "routes.reportTasks",
            order: 2,
            requiresAuth: true,
        },
    },
    {
        // 对比分析
        path: "/compare-analysis",
        name: "CompareAnalysis",
        meta: {
            locale: "routes.compareAnalysis",
            order: 3,
            requiresAuth: true,
        },
    },
    {
        // 事件报表
        path: "/event-reports",
        name: "EventReports",
        meta: {
            locale: "routes.eventReports",
            order: 4,
            requiresAuth: true,
        },
    },
];

// 业务安全审计员-策略中心
const strategyCenter = [
    {
        // 策略定义
        path: "/strategys",
        name: "Strategys",
        meta: {
            locale: "routes.strategys",
            order: 1,
            requiresAuth: true,
        },
    },
    {
        // 对象管理
        path: "/objects",
        name: "Objects",
        meta: {
            locale: "routes.objects",
            order: 2,
            requiresAuth: true,
        },
    },
];

// 业务安全审计员-部署管理
const deployAdmin = [
    {
        // 流量探针管理
        path: "/flow-probes",
        name: "FlowProbes",
        meta: {
            locale: "routes.flowProbes",
            order: 1,
            requiresAuth: true,
        },
    },
    {
        // 监听配置
        path: "/vocational-configures",
        name: "VocationalConfigures",
        meta: {
            locale: "routes.vocationalConfigures",
            order: 2,
            requiresAuth: true,
        },
    },
    {
        // 数据归档
        path: "/data-archives",
        name: "DataArchives",
        meta: {
            locale: "routes.dataArchives",
            order: 3,
            requiresAuth: true,
        },
    },
];

// 默认业务安全审计员路由 roles 为业务安全审计员
export const defautlSecurityAdminRoutes = [
    // 默认公共路由
    ...defaultCommonRoutes,
    // 监控中心
    {
        path: "/",
        meta: {
            // 对应 i18n 文件 routes.json 中的字段
            locale: "routes.monitorCenter",
            icon: "icon-monitor",
            // 是否需要登录鉴权
            requiresAuth: true,
            // 排序路由菜单项
            order: 1,
            // 页面操作/按钮权限
            subactions: [],
        },
        // 应用路由
        children: [...securityMonitor],
    },
    // 审计中心
    {
        path: "/",
        meta: {
            // 对应 i18n 文件 routes.json 中的字段
            locale: "routes.auditCenter",
            icon: "icon-audit",
            // 是否需要登录鉴权
            requiresAuth: true,
            // 排序路由菜单项
            order: 1,
            // 页面操作/按钮权限
            subactions: [],
        },
        // 应用路由
        children: [...auditCenter],
    },
    // 数据分析中心
    {
        path: "/",
        meta: {
            // 对应 i18n 文件 routes.json 中的字段
            locale: "routes.analysisCenter",
            icon: "icon-analysis",
            // 是否需要登录鉴权
            requiresAuth: true,
            // 排序路由菜单项
            order: 1,
            // 页面操作/按钮权限
            subactions: [],
        },
        // 应用路由
        children: [...analysisCenter],
    },
    // 策略中心
    {
        path: "",
        meta: {
            // 对应 i18n 文件 routes.json 中的字段
            locale: "routes.strategyCenter",
            icon: "icon-strategy",
            // 是否需要登录鉴权
            requiresAuth: true,
            // 排序路由菜单项
            order: 1,
            // 页面操作/按钮权限
            subactions: [],
        },
        // 应用路由
        children: [...strategyCenter],
    },
    // 部署管理
    {
        path: "/",
        meta: {
            // 对应 i18n 文件 routes.json 中的字段
            locale: "routes.deployAdmin",
            icon: "icon-deploy",
            // 是否需要登录鉴权
            requiresAuth: true,
            // 排序路由菜单项
            order: 1,
            // 页面操作/按钮权限
            subactions: [],
        },
        // 应用路由
        children: [...deployAdmin],
    },
];
