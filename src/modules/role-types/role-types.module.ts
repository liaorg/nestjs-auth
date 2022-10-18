import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RoleTypesEntity } from "./entities";
import { RoleTypesService } from "./role-types.service";

@Module({
    imports: [TypeOrmModule.forFeature([RoleTypesEntity], "authConnection")],
    providers: [RoleTypesService],
    exports: [RoleTypesService],
})
export class RoleTypesModule {}
