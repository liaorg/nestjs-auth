import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RoleController } from "./role.controller";
import { RoleEntity } from "./entities";
import { RoleService } from "./role.service";
import { RoleGroupEntity, RoleGroupRoleRelationEntity } from "../role-group/entities";

@Module({
    imports: [TypeOrmModule.forFeature([RoleGroupEntity, RoleEntity, RoleGroupRoleRelationEntity])],
    exports: [],
    controllers: [RoleController],
    providers: [RoleService],
})
export class RoleModule {}
