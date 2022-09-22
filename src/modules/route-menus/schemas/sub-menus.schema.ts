import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { BaseRouteMenusDocument } from "./base-route-menus.schema";
import { SubActions, SubActionsSchema } from "./sub-actions.schema";

export type SubMenusDocument = SubMenus & BaseRouteMenusDocument;
// 定义四级菜单 submenus
@Schema()
export class SubMenus extends BaseRouteMenusDocument {
    // 子文档-子菜单操作
    @Prop({ type: [SubActionsSchema] })
    subactions: SubActions[];
}
export const SubMenusSchema = SchemaFactory.createForClass(SubMenus);
