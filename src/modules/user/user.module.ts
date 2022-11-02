import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity, UserRoleRelationEntity } from "./entities";

@Module({
    // 注册存储库
    imports: [TypeOrmModule.forFeature([UserEntity, UserRoleRelationEntity])],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService, TypeOrmModule],
})
export class UserModule {}
