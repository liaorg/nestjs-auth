import { Module } from "@nestjs/common";
import { RolesService } from "./roles.service";
import { RolesController } from "./roles.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Roles, RolesSchema } from "./schemas";

@Module({
    imports: [MongooseModule.forFeature([{ name: Roles.name, schema: RolesSchema }])],
    exports: [],
    controllers: [RolesController],
    providers: [RolesService],
})
export class RolesModule {}
