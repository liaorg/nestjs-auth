/*
https://docs.nestjs.com/guards#guards
*/

import { Injectable, ExecutionContext } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { SchemaObject } from "ajv";
import { REQUEST_SCHEMA_VALIDATION } from "@/common/constants";
import { I18nValidationException } from "nestjs-i18n";
import { validate } from "@/common/utils";
import { LoginDto } from "@/modules/admin/user/dto/login.dto";

/**
 * 用户数据权限守卫
 * 验证请求参数
 * @export
 * @class BusinessAuthGuard
 */
@Injectable()
export class BusinessAuthGuard extends AuthGuard() {
    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        // 检查请求中是否有登录字段
        return this.validateRequest(request, context);
    }

    // 验证请求
    validateRequest(request: Request, context: ExecutionContext): boolean {
        const schema: SchemaObject = Reflect.getMetadata(REQUEST_SCHEMA_VALIDATION, LoginDto) || {};
        // 验证请求参数
        const errors = validate(schema, request.body);
        if (errors.length) {
            // 抛出错误
            throw new I18nValidationException(errors);
        }
        return super.canActivate(context) as boolean;
    }
}
