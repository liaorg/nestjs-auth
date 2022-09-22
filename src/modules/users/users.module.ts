import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { MongooseModule } from "@nestjs/mongoose";
// import { JwtModule } from "@nestjs/jwt";
import { Users, UsersSchema } from "./schemas/users.schema";
import { UsersController } from "./users.controller";
// import { TokenService } from "../auth/services";
// import { jwtConstants } from "../auth/constants";
// import { AccessToken, AccessTokenSchema } from "../auth/schemas";

@Module({
    // 注册存储库
    imports: [
        MongooseModule.forFeature([
            { name: Users.name, schema: UsersSchema },
            // { name: AccessToken.name, schema: AccessTokenSchema },
        ]),
        // JwtModule.register({
        //     secret: jwtConstants.secret,
        //     signOptions: {
        //         expiresIn: `${jwtConstants.tokenExpired}s`, // 有效时长
        //     },
        // }),
    ],
    controllers: [UsersController],
    // providers: [UsersService, TokenService],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule {}
