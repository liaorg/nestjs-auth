import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { BaseRouteDocument } from "./base-routes.schema";
import { ThirdRoutes, ThirdRoutesSchema } from "./third-routes.schema";

export type SecondRoutesDocument = SecondRoutes & BaseRouteDocument;
// 定义二级子路由操作 children
@Schema()
export class SecondRoutes extends BaseRouteDocument {
    // 子路由
    @Prop({ type: [ThirdRoutesSchema] })
    children: ThirdRoutes[];
}
export const SecondRoutesSchema = SchemaFactory.createForClass(SecondRoutes);
