import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthService } from "./auth.service";
// import { AuthController } from "./auth.controller";
import { JwtStrategy, LocalStrategy } from "./strategies";
import { TokenService } from "./services";
import { jwtConstants } from "./constants";
import { APP_GUARD } from "@nestjs/core";
import { JwtAuthGuard, RoleGuard } from "./guards";
import { AccessTokenEntity, RefreshTokenEntity } from "./entities";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserService } from "@/modules/admin/user/user.service";
import { UserEntity } from "@/modules/admin/user/entities";
import { RoleService } from "@/modules/admin/role/role.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([AccessTokenEntity, RefreshTokenEntity, UserEntity]),
        PassportModule.register({ defaultStrategy: "jwt" }),
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: {
                expiresIn: `${jwtConstants.tokenExpired}s`, // 有效时长
            },
        }),
    ],
    // controllers: [AuthController],
    providers: [
        AuthService,
        LocalStrategy,
        JwtStrategy,
        TokenService,
        UserService,
        RoleService,
        // 全局路由守卫
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard,
        },
        // 角色路由守卫
        {
            provide: APP_GUARD,
            useClass: RoleGuard,
        },
    ],
    exports: [AuthService],
})
export class AuthModule {}
