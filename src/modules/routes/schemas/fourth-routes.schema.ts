import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { BaseRouteDocument } from "./base-routes.schema";
import { RouteChildren, RouteChildrenSchema } from "./route-children.schema";

export type FourthRoutesDocument = FourthRoutes & BaseRouteDocument;
// 定义四级级子路由操作 children
@Schema()
export class FourthRoutes extends BaseRouteDocument {
    // 子路由
    @Prop({ type: [RouteChildrenSchema] })
    children: RouteChildren[];
}
export const FourthRoutesSchema = SchemaFactory.createForClass(FourthRoutes);
