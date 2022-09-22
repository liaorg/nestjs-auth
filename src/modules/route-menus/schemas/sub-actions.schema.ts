import { Schema, SchemaFactory } from "@nestjs/mongoose";
import { BaseRouteMenusDocument } from "./base-route-menus.schema";

export type SubActionsDocument = SubActions & BaseRouteMenusDocument;
// 定义子菜单操作 subactions
// 主要用于页面操作权限控制
// 如果一个页面中的某操作要进行权限控制，可以为其分配一下路由来达到控制的目的
@Schema()
export class SubActions extends BaseRouteMenusDocument {}
export const SubActionsSchema = SchemaFactory.createForClass(SubActions);
