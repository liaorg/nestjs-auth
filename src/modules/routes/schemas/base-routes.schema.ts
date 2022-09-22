import { BaseDocument } from "@/common/schemas";
import { Prop } from "@nestjs/mongoose";
import { RoutePermission } from "../enums/route-permission.enum";

// 路由元数据
interface RouteMeta {
    // 对应 i18n 文件 routes.json 中的字段
    locale: string;
    // 是否需要登录鉴权
    requiresAuth: boolean;
    // 是否在左侧菜单中隐藏该项
    hideInMenu?: boolean;
    // 是否在左侧菜单子菜单中隐藏该项
    hideChildrenInMenu?: boolean;
    // 图标
    icon?: string;
    // 排序路由菜单项
    order?: number;
}

// 路由页面操作/按钮权限
interface SubActions {
    path: string;
    // 操作权限就是对应的http操作方法：post|patch|delete|get
    permission: RoutePermission[];
}

export class BaseRouteDocument extends BaseDocument {
    // 路由，基本路由不包括路由前缀，在Controller中定义的路由
    @Prop({ type: String, trim: true, index: true })
    path: string;

    // 重定向跳转
    @Prop({ type: String, trim: true })
    redirect: string;

    // 路由名称
    @Prop({ type: String, trim: true })
    name: string;

    // 元数据
    @Prop({ type: Object })
    meta: RouteMeta;

    // 状态：0-失效|1-有效
    @Prop({ type: Number, default: 1 })
    status: number;

    // 路由权限，对应的http操作方法：post|patch|delete|get
    // 如果不设置则为全部权限
    @Prop({ type: Array })
    permission: RoutePermission[];

    // 页面操作/按钮权限
    // 页面操作中除了本路由操作以外的其他路由操作
    @Prop({ type: Array })
    subactions: SubActions[];
}
