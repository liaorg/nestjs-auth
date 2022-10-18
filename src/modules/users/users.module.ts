import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersEntity } from "./entities";
import { AccessTokensEntity, RefreshTokensEntity } from "../auth/entities";

@Module({
    // 注册存储库
    imports: [TypeOrmModule.forFeature([AccessTokensEntity, RefreshTokensEntity, UsersEntity])],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService, TypeOrmModule],
})
export class UsersModule {}
