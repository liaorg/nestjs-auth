import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { BaseRouteMenusDocument } from "./base-route-menus.schema";
import { SonMenus, SonMenusSchema } from "./son-menus.schema";
import { SubActions, SubActionsSchema } from "./sub-actions.schema";

export type RouteMenusChildrenDocument = RouteMenusChildren & BaseRouteMenusDocument;

// 定义二级菜单文档 children
@Schema()
export class RouteMenusChildren extends BaseRouteMenusDocument {
    // 子文档-下一级路由菜单
    @Prop({ type: [SonMenusSchema] })
    sonmenus: SonMenus[];
    // 子文档-子菜单操作
    @Prop({ type: [SubActionsSchema] })
    subactions: SubActions[];
}
export const RouteMenusChildrenSchema = SchemaFactory.createForClass(RouteMenusChildren);
