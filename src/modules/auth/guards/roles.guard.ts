/*
https://docs.nestjs.com/guards#guards
*/

import { Injectable, ExecutionContext } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthError } from "@/common/constants";
import { AuthException } from "../auth.exception";
import { Request } from "express";

/**
 * RBAC 角色菜单权限守卫
 * 验证请求参数
 * @export
 * @class RolesGuard
 */
@Injectable()
export class RolesGuard extends AuthGuard() {
    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        // 检查请求中是否有登录字段
        return this.validateRequest(request);
    }

    // 验证请求
    // https://gitee.com/nestplus/nestplus/blob/main/src/modules/user/guards/owner-resource.guard.ts
    validateRequest(request: Request): boolean {
        // 验证请求用户的角色
        const role = request.user ?? "";
        if (!role) {
            const error = {
                statusCode: 403,
                ...AuthError.forbidden,
            };
            throw new AuthException(error);
        }
        // 通过 role 查找菜单权限，对比 request.url 路由
        // const route = request.originalUrl ?? request.url;
        // await this.model.findOne({ menuname: route, role: {$all: [role]} }).lean();
        return true;
    }
}
