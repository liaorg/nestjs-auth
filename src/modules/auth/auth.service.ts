import { Injectable } from "@nestjs/common";
import { scryptSync } from "crypto";
import { UsersService } from "../users/users.service";
import { ExtractJwt } from "passport-jwt";
import { getUTCTime } from "@/common/utils";
import { AuthException } from "./auth.exception";
import { AuthError } from "@/common/constants";
import { UserInfoDto } from "../users/dto/user-info.dto";
import { RequestUserDto } from "./dto";
import { TokensService } from "./services";

/**
 * 自定义中间件
 * 用户认证服务
 */
@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService, private readonly tokensService: TokensService) {}
    /**
     * 用户登录，查询用户是否存在
     * @param name
     * @param passwd
     * @returns
     */
    async validateUser(name: string, passwd: string): Promise<UserInfoDto | null | undefined> {
        const user = await this.usersService.findOneByName(name);
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
            return await this.tokensService.removeAccessToken(accessToken);
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
     * @param {UserEntity} reqUser
     * @memberof AuthService
     */
    async createToken(reqUser: RequestUserDto) {
        const now = getUTCTime();
        const user = await this.usersService.findById(reqUser.id);
        const { accessToken } = await this.tokensService.generateAccessToken(user, now);
        // TODO 记录登录日志
        return accessToken.value;
    }
}
