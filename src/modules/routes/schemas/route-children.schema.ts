import { Schema, SchemaFactory } from "@nestjs/mongoose";
import { BaseRouteDocument } from "./base-routes.schema";

export type RouteChildrenDocument = RouteChildren & BaseRouteDocument;
// 定义子路由操作 children
@Schema()
export class RouteChildren extends BaseRouteDocument {}
export const RouteChildrenSchema = SchemaFactory.createForClass(RouteChildren);
