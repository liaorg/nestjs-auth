/*
https://docs.nestjs.com/guards#guards
*/

import { Injectable, ExecutionContext, CanActivate } from "@nestjs/common";
import { AuthError } from "@/common/constants";
import { AuthException } from "../auth.exception";
import { Request } from "express";
import { Reflector } from "@nestjs/core";
import { ALLOW_GUEST } from "../constants";
import { RequestUserDto } from "../dto";
import { UserService } from "@/modules/admin/user/user.service";
import { appConfig } from "@/config";

/**
 * RBAC 角色菜单权限守卫
 * 验证请求参数
 * @export
 * @class RoleGuard
 */
@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private reflector: Reflector, private readonly userService: UserService) {}
    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const allowGuest = this.reflector.getAllAndOverride<boolean>(ALLOW_GUEST, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (allowGuest) return true;
        // 检查请求中是否有登录字段
        return await this.validateRole(request);
    }

    // 验证用户角色权限
    async validateRole(request: Request): Promise<boolean> {
        // console.log("validateRole");
        // 验证请求用户的角色
        const user = request.user as RequestUserDto;
        if (!user.id) {
            const error = {
                statusCode: 403,
                ...AuthError.forbidden,
            };
            throw new AuthException(error);
        }
        // 通过 user role 查找菜单权限，对比 request.route.path 路由
        // 要去掉路由前缀
        const path = request.route.path.replace(appConfig.adminPrefix, "");
        const method = request.method.toUpperCase();
        const userRoute = await this.userService.matchRoutePermission(user.id, path, method);
        if (!userRoute) {
            const error = {
                statusCode: 403,
                ...AuthError.forbidden,
            };
            throw new AuthException(error);
        }
        return true;
    }
}
