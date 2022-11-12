import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity, UserRoleRelationEntity } from "./entities";
import { AuthModule } from "@/modules/shared/auth/auth.module";
import { OperateEntity, PermissionEntity } from "@/modules/shared/permission/entities";
import { RolePermissionRelationEntity } from "../role/entities/role-permission-relation";
import { AdminApiOperatePermissionRelationEntity } from "../common/entities";

@Module({
    // 注册存储库
    imports: [
        TypeOrmModule.forFeature([
            UserEntity,
            UserRoleRelationEntity,
            RolePermissionRelationEntity,
            PermissionEntity,
            // OperatePermissionRelationEntity,
            OperateEntity,
            AdminApiOperatePermissionRelationEntity,
        ]),
        AuthModule,
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule {}
