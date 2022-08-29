import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtModule } from "@nestjs/jwt";
import { User, UserSchema } from "./schemas/users.schema";
import { UsersController } from "./users.controller";
import { APP_GUARD } from "@nestjs/core";
import { JwtAuthGuard } from "../auth/guards";
import { TokenService } from "../auth/services";
import { jwtConstants } from "../auth/constants";
import { AccessToken, AccessTokenSchema, RefreshToken, RefreshTokenSchema } from "../auth/schemas";

@Module({
    // 注册存储库
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema },
            { name: AccessToken.name, schema: AccessTokenSchema },
            { name: RefreshToken.name, schema: RefreshTokenSchema },
        ]),
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: {
                expiresIn: `${jwtConstants.tokenExpired}s`, // 有效时长
            },
        }),
    ],
    controllers: [UsersController],
    providers: [
        UsersService,
        TokenService,
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard,
        },
    ],
    exports: [UsersService],
})
export class UsersModule {}
