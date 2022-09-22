import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtStrategy, LocalStrategy } from "./strategies";
import { TokenService } from "./services";
import { UsersModule } from "../users/users.module";
import { jwtConstants } from "./constants";
import { APP_GUARD } from "@nestjs/core";
import { JwtAuthGuard } from "./guards";
import { MongooseModule } from "@nestjs/mongoose";
import { AccessToken, AccessTokenSchema } from "./schemas";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: AccessToken.name, schema: AccessTokenSchema }]),
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
        TokenService,
        // 全局路由守卫
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard,
        },
    ],
})
export class AuthModule {}
