import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { BaseRouteMenusDocument } from "./base-route-menus.schema";
import { SubActions, SubActionsSchema } from "./sub-actions.schema";
import { SubMenus, SubMenusSchema } from "./sub-menus.schema";

export type SonMenusDocument = SonMenus & BaseRouteMenusDocument;
// 定义三级菜单 sonmenus
@Schema()
export class SonMenus extends BaseRouteMenusDocument {
    // 子文档-下一级路由菜单
    @Prop({ type: [SubMenusSchema] })
    submenus: SubMenus[];
    // 子文档-子菜单操作
    @Prop({ type: [SubActionsSchema] })
    subactions: SubActions[];
}
export const SonMenusSchema = SchemaFactory.createForClass(SonMenus);
