import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";
import { Logger } from "../utils";

// 响应映射，规范响应输出

@Injectable()
export class TransformInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        // 获取请求体
        const ctx = context.switchToHttp();
        const res = ctx.getResponse();
        const req = ctx.getRequest();
        return next.handle().pipe(
            map((data) => {
                const date = new Date().toLocaleString();
                const responseData = {
                    statusCode: res.statusCode,
                    errorCode: 0,
                    method: req.method,
                    path: req.url,
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
                // 记录日志
                const logFormat = ` <<< ${res.statusCode} ${JSON.stringify(data)}`;
                // console.log(logFormat);
                Logger.access(logFormat);
                return responseData;
            }),
        );
    }
}
