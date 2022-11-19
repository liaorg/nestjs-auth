import { Injectable } from "@nestjs/common";
import { scryptSync } from "crypto";
import { ExtractJwt } from "passport-jwt";
import { getUTCTime } from "@/common/utils";
import { AuthException } from "./auth.exception";
import { AuthError } from "@/common/constants";
import { RequestUserDto } from "./dto";
import { TokenService } from "./services";
import { UserService } from "@/modules/admin/user/user.service";

/**
 * 自定义中间件
 * 用户认证服务
 */
@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly tokenService: TokenService,
    ) {}
    /**
     * 用户登录，查询用户是否存在
     * @param name
     * @param passwd
     * @returns
     */
    async validateUser(name: string, passwd: string): Promise<RequestUserDto | null | undefined> {
        // 获取指定用户包含密码
        const user = await this.userService.findOneContainPassword(name);
        if (!user) {
            // 用户不存在
            return null;
        }
        // 通过密码盐，加密传参，再与数据库里的比较，判断是否相等
        const hashPasswd = scryptSync(passwd, user.passwordSalt, 64).toString("hex");
        if (user.password === hashPasswd) {
            // 获取角色信息
            // 权限信息
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
     * @param {UserEntity} reqUser
     * @memberof AuthService
     */
    async createToken(reqUser: RequestUserDto) {
        const now = getUTCTime();
        const user = await this.userService.findById(reqUser.id);
        const { accessToken } = await this.tokenService.generateAccessToken(user.id, now);
        // TODO 记录登录日志
        return accessToken.value;
    }
}
