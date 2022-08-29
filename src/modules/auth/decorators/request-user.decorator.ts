import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { RequestUserDto } from "../dto";

/**
 * 当前用户装饰器
 * 通过request查询通过jwt解析出来的当前登录的用户模型实例
 * 并用于控制器直接注入
 */
export const RequestUserDecorator = createParamDecorator(async (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as RequestUserDto;
});
