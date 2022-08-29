import { Injectable } from "@nestjs/common";
import { scryptSync } from "crypto";
import { UsersService } from "../users/users.service";
import { ExtractJwt } from "passport-jwt";
import { UserDto } from "../users/dto";
import { getUTCTime } from "@/common/utils";
import { TokenService } from "./services/token.service";
import { RequestUserDto } from "./dto";
import { AuthException } from "./auth.exception";
import { AuthError } from "@/common/constants";
// // import { RedisInstance } from "src/database/redis";

/**
 * 自定义中间件
 * 用户认证服务
 */
@Injectable()
export class AuthService {
    constructor(private readonly userService: UsersService, private readonly tokenService: TokenService) {}
    /**
     * 用户登录，查询用户是否存在
     * @param name
     * @param passwd
     * @returns
     */
    async validateUser(name: string, passwd: string): Promise<UserDto | null | undefined> {
        const user = await this.userService.findOneByName(name);
        if (!user) {
            // 用户不存在
            return null;
        }
        // 通过密码盐，加密传参，再与数据库里的比较，判断是否相等
        const hashPasswd = scryptSync(passwd, user.passwordSalt, 64).toString("hex");
        if (user.password === hashPasswd) {
            return user;
        }
        // 密码错误
        return undefined;
    }
    // /**
    //  * 登录用户,并生成新的token和refreshToken
    //  *
    //  * @param {UserEntity} user
    //  * @returns
    //  * @memberof AuthService
    //  */
    // async login(user: LoginDto) {
    //     const now = getUTCTime();
    //     const { accessToken } = await this.tokenService.generateAccessToken(user, now);
    //     return accessToken.value;
    // }

    /**
     * 注销登录
     *
     * @param {Request} req
     * @returns
     * @memberof AuthService
     */
    async logout(req: Request) {
        const accessToken = ExtractJwt.fromAuthHeaderAsBearerToken()(req as any);
        if (accessToken) {
            return await this.tokenService.removeAccessToken(accessToken);
        }
        const error = {
            statusCode: 403,
            ...AuthError.forbidden,
        };
        throw new AuthException(error);
    }
    /**
     * 登录用户后生成新的token和refreshToken
     *
     * @param {UserEntity} user
     * @memberof AuthService
     */
    async createToken(user: RequestUserDto) {
        const now = getUTCTime();
        const userInfo = await this.userService.findById(user._id);
        // userInfo => RequestUserDto
        const newUser: RequestUserDto = {
            _id: userInfo._id,
            username: userInfo.username,
            role: userInfo.role,
        };
        const { accessToken } = await this.tokenService.generateAccessToken(newUser, now);
        // TODO 记录登录日志
        return accessToken.value;
    }
}
