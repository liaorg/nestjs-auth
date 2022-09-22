import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { RoutesService } from "./routes.service";
import { Routes, RoutesSchema } from "./schemas";

@Module({
    imports: [MongooseModule.forFeature([{ name: Routes.name, schema: RoutesSchema }])],
    // 路由管理不对外开放路由
    // controllers: [RoutesController],
    providers: [RoutesService],
})
export class RoutesModule {}
