import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { RoleTypes, RoleTypesSchema } from "../role-types/schemas";
// import { RoleTypesModule } from "../role-types/role-types.module";
import { RouteMenusController } from "./route-menus.controller";
import { RouteMenusService } from "./route-menus.service";

@Module({
    // imports: [RoleTypesModule],
    imports: [MongooseModule.forFeature([{ name: RoleTypes.name, schema: RoleTypesSchema }])],
    controllers: [RouteMenusController],
    providers: [RouteMenusService],
    exports: [RouteMenusService],
})
export class RouteMenusModule {}
