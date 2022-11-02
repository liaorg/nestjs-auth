import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RoleEntity } from "../role/entities";
import { RoleGroupEntity, RoleGroupRoleRelationEntity } from "./entities";
import { RoleGroupService } from "./role-group.service";

@Module({
    imports: [TypeOrmModule.forFeature([RoleGroupEntity, RoleEntity, RoleGroupRoleRelationEntity])],
    providers: [RoleGroupService],
    exports: [RoleGroupService],
})
export class RoleGroupModule {}
