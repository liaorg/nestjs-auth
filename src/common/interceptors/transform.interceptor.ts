import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";
import { Logger } from "../utils";

// 响应映射，规范响应输出

@Injectable()
export class TransformInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        // 获取请求体
        const ctx = context.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        return next.handle().pipe(
            map((data) => {
                const date = new Date().toLocaleString();
                const responseData = {
                    statusCode: response.statusCode,
                    errorCode: 0,
                    method: request.method,
                    path: request.url,
                    date: date,
                    message: "success",
                };
                if (data.errorCode) {
                    // 失败
                    responseData.errorCode = data.errorCode;
                    responseData.message = data.errorMessage;
                } else {
                    // 成功
                    responseData["data"] = data;
                }
                // 组装日志信息
                let requestContent = `>>> ${response.statusCode} ${request.method} ${request.ip} ${request.originalUrl}`;
                requestContent += request["user"] ? `user: ${JSON.stringify(request["user"])}` : "";
                // // requestContent += `\nHeaders: ${JSON.stringify(req.headers)}`;
                requestContent += Object.keys(request.params ?? {}).length
                    ? `\nParmas: ${JSON.stringify(request.params)}`
                    : "";
                requestContent += Object.keys(request.query ?? {}).length
                    ? `\nQuery: ${JSON.stringify(request.query)}`
                    : "";
                requestContent += Object.keys(request.body ?? {}).length
                    ? `\nBody: ${JSON.stringify(request.body)}`
                    : "";
                // 记录日志
                const logFormat = `${requestContent}\n <<< ${response.statusCode} ${JSON.stringify(data)}`;
                // console.log(logFormat);
                Logger.access(logFormat);
                return responseData;
            }),
        );
    }
}
