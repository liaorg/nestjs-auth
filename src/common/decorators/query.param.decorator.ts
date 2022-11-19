import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { fromBase64 } from "js-base64";
import { ApiError } from "../constants";
import { ApiException } from "../exceptions";

/**
 * 查询query装饰器
 * 通过request查询通过获取请求?param=base64的参数
 * 如： ?param=base64(json({"id":[103,102]}))
 * 要用 base64 URL-safe 编码
 * 并用于控制器直接注入
 * URL最长为 2048 个字符
 * 所以 param 要有长度限制
 */
export const QueryParamDecorator = createParamDecorator(async (key: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    try {
        const param: string = request.query.param.trim();
        // const buff = Buffer.from(param, "base64");
        // const utf8String = buff ? buff.toString("utf-8") : "";
        // base64 解码，注意 param 要用 base64 URL-safe 编码
        const utf8String = fromBase64(param);
        const data = utf8String ? JSON.parse(utf8String) : "";
        return key ? data && data[key] : data;
    } catch (err) {
        const error = {
            ...ApiError.badParams,
        };
        throw new ApiException(error);
    }
});
