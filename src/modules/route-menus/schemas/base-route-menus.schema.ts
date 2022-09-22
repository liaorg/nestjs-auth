import { BaseDocument } from "@/common/schemas";
import { Prop } from "@nestjs/mongoose";

export class BaseRouteMenusDocument extends BaseDocument {
    // 路由
    @Prop({ type: String, required: true, trim: true, unique: true })
    route: string;

    // 路由菜单名 对应 i18n文件route-menus.json中的字段
    @Prop({ type: String, required: true, trim: true })
    menuname: string;

    // 菜单所属角色如： systemAdmin|securityAdmin|auditAdmin
    @Prop({ required: true, index: true })
    role: string[];

    // 菜单操作权限就是对应的http操作方法：post|patch|delete|get
    @Prop({ required: true, index: true })
    permission: string[];

    // // 子文档-下一级路由菜单
    // @Prop({ type: [RouteMenusChildrenSchema], trim: true })
    // children: RouteMenusChildrenDocument[];

    // 节点图标，对应
    @Prop({ type: String, trim: true, default: "Link" })
    icon: string;

    // 排序号
    @Prop({ type: Number, default: 0 })
    order: number;

    // 状态：0-失效|1-有效|2必须的基础菜单
    @Prop({ type: Number, default: 1 })
    status: number;
}
