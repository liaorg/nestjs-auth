import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { BaseRouteDocument } from "./base-routes.schema";
import { FourthRoutes, FourthRoutesSchema } from "./fourth-routes.schema";

export type ThirdRoutesDocument = ThirdRoutes & BaseRouteDocument;
// 定义三级子路由操作 children
@Schema()
export class ThirdRoutes extends BaseRouteDocument {
    // 子路由
    @Prop({ type: [FourthRoutesSchema] })
    children: FourthRoutes[];
}
export const ThirdRoutesSchema = SchemaFactory.createForClass(ThirdRoutes);
