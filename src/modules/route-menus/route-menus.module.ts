import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RoleTypesEntity } from "../role-types/entities";
import { RouteMenusController } from "./route-menus.controller";
import { RouteMenusService } from "./route-menus.service";

@Module({
    imports: [TypeOrmModule.forFeature([RoleTypesEntity], "authConnection")],
    controllers: [RouteMenusController],
    providers: [RouteMenusService],
    exports: [RouteMenusService],
})
export class RouteMenusModule {}
