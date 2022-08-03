import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";
// import { Logger } from "src/utils/log4js";

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
                    data,
                };
                const logFormat = ` <<< [${date}] ${res.statusCode} ${JSON.stringify(data)}`;
                console.log(logFormat);
                // Logger.info(logFormat);
                // Logger.access(logFormat);
                return responseData;
            }),
        );
    }
}