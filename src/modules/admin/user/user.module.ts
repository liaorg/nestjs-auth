import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "@/modules/shared/auth/auth.module";
import { RolePermissionRelationEntity } from "../role/entities/role-permission-relation";
import { RoleService } from "../role/role.service";

@Module({
    // 注册存储库
    imports: [TypeOrmModule.forFeature([RolePermissionRelationEntity]), AuthModule],
    controllers: [UserController],
    providers: [UserService, RoleService],
    exports: [UserService],
})
export class UserModule {}
