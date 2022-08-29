import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { plainToInstance } from "class-transformer";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { OBJECT_SERIALIZER_DTO } from "../constants";
import { Document } from "mongoose";

/**
 * 自定义拦截器，根据传递的dto结构转换和净化要返回给客户的数据
 * 用于排除敏感数据（如用户密码）
 * dto结构 由装饰器设置 @ObjectSerializerDto(dto)
 * 使用：
 * 在 dto 类中的属性使用 @Exclude() `class-transformer` 装饰器排除
 * 在类或方法使用装饰器传道转换结构
 * @ObjectSerializerDto(dto)
 * @UseInterceptors(ObjectSerializerInterceptor)
 */

@Injectable()
export class ObjectSerializerInterceptor implements NestInterceptor {
    constructor(protected readonly reflector: Reflector) {}
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const contextDto = this.getContextDto(context);
        return next.handle().pipe(
            map((data) => {
                if (typeof data === "object") {
                    if (Array.isArray(data)) {
                        if (data.length && data[0] instanceof Document) {
                            // 如果是 mongoose 的文档对象要转换一下
                            data = JSON.parse(JSON.stringify(data));
                        }
                    } else if (data instanceof Document) {
                        // 如果是 mongoose 的文档对象要转换一下
                        data = JSON.parse(JSON.stringify(data));
                    }
                    // 转换数据，并排除带有 __ 前缀的属性
                    return plainToInstance(contextDto, data, { excludePrefixes: ["__"] });
                }
                return data;
            }),
        );
    }

    // 获取类或方法中的参数： OBJECT_SERIALIZER_DTO
    protected getContextDto(context: ExecutionContext) {
        return this.reflector.getAllAndOverride(OBJECT_SERIALIZER_DTO, [context.getHandler(), context.getClass()]);
    }
}
