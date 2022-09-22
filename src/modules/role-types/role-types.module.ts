import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { RoleTypesService } from "./role-types.service";
import { RoleTypes, RoleTypesSchema } from "./schemas";

@Module({
    imports: [MongooseModule.forFeature([{ name: RoleTypes.name, schema: RoleTypesSchema }])],
    providers: [RoleTypesService],
    exports: [RoleTypesService],
})
export class RoleTypesModule {}
