import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { BaseRouteDocument } from "./base-routes.schema";
import { SecondRoutes, SecondRoutesSchema } from "./second-routes.schema";

export type RoutesDocument = Routes & BaseRouteDocument;
//
// 定义路由表 routes
@Schema({ collection: "routes" })
export class Routes extends BaseRouteDocument {
    // 子路由
    @Prop({ type: [SecondRoutesSchema] })
    children: SecondRoutes[];
}
export const RoutesSchema = SchemaFactory.createForClass(Routes);
