/*
https://docs.nestjs.com/guards#guards
*/

import { AuthError } from "@/common/constants";
import { Injectable, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { ExtractJwt } from "passport-jwt";
import { AuthException } from "../auth.exception";
import { ALLOW_GUEST, IS_PUBLIC_KEY } from "../constants";
import { TokensService } from "../services";

/**
 * 用户JWT认证守卫
 * 检测用户是否已登录
 *
 * @export
 * @class JwtAuthGuard
 * @extends {AuthGuard('jwt')}
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
    constructor(private reflector: Reflector, private readonly tokenService: TokensService) {
        super();
    }

    /**
     * 守卫方法
     *
     * @param {ExecutionContext} context
     * @returns
     * @memberof JwtAuthGuard
     */
    async canActivate(context: ExecutionContext) {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) return true;
        const allowGuest = this.reflector.getAllAndOverride<boolean>(ALLOW_GUEST, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (allowGuest) return true;
        // 从请求头中获取token
        // 如果请求头不含有authorization字段则认证失败
        const request = context.switchToHttp().getRequest();
        const requestToken = ExtractJwt.fromAuthHeaderAsBearerToken()(request);
        if (!requestToken) return false;
        // 判断token是否存在,如果不存在则认证失败
        const accessToken = await this.tokenService.checkAccessToken(requestToken);
        if (!accessToken) {
            const error = {
                statusCode: 401,
                ...AuthError.unauthorized,
            };
            throw new AuthException(error);
        }
        try {
            // 检测token是否为损坏或过期的无效状态,如果无效则尝试刷新token
            return (await super.canActivate(context)) as boolean;
        } catch (e) {
            // 尝试通过refreshToken刷新token
            // 刷新成功则给请求头更换新的token
            // 并给响应头添加新的token和refreshtoken
            const response = context.switchToHttp().getResponse();
            const refreshToken = await this.tokenService.refreshToken(accessToken, response);
            if (!refreshToken) return false;
            if (refreshToken.accessToken) {
                request.headers.authorization = `Bearer ${refreshToken.accessToken.value}`;
            }
            // 刷新失败则再次抛出认证失败的异常
            return super.canActivate(context) as boolean;
        }
    }
}
