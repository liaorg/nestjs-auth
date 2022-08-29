import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtStrategy, LocalStrategy } from "./strategies";
import { TokenService } from "./services";
import { UsersModule } from "../users/users.module";
import { jwtConstants } from "./constants";
import { MongooseModule } from "@nestjs/mongoose";
import { AccessToken, AccessTokenSchema, RefreshToken, RefreshTokenSchema } from "./schemas";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: AccessToken.name, schema: AccessTokenSchema },
            { name: RefreshToken.name, schema: RefreshTokenSchema },
        ]),
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
    providers: [AuthService, LocalStrategy, JwtStrategy, TokenService],
})
export class AuthModule {}
