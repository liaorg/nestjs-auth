import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtStrategy, LocalStrategy } from "./strategies";
import { TokensService } from "./services";
import { UsersModule } from "../users/users.module";
import { jwtConstants } from "./constants";
import { APP_GUARD } from "@nestjs/core";
import { JwtAuthGuard } from "./guards";
import { AccessTokensEntity, RefreshTokensEntity } from "./entities";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersService } from "../users/users.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([AccessTokensEntity, RefreshTokensEntity]),
        PassportModule.register({ defaultStrategy: "jwt" }),
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: {
                expiresIn: `${jwtConstants.tokenExpired}s`, // 有效时长
            },
        }),
        UsersModule,
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        LocalStrategy,
        JwtStrategy,
        TokensService,
        UsersService,
        // 全局路由守卫
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard,
        },
    ],
    exports: [AuthService, TypeOrmModule],
})
export class AuthModule {}
