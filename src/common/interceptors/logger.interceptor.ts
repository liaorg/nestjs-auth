import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { tap, Observable } from "rxjs";
// import { Logger } from "src/utils/log4js";

// 日志拦截器
// 记录请求行为

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        // 获取请求体
        const ctx = context.switchToHttp();
        // const res = ctx.getResponse();
        const req = ctx.getRequest();
        const date = new Date().toLocaleString();
        const requestContent = ` >>> [${date}] ${req.method} ${req.ip} ${req.originalUrl} user:${JSON.stringify(
            req.user,
        )}
Headers: ${JSON.stringify(req.headers)}
Parmas: ${JSON.stringify(req.params)}
Query: ${JSON.stringify(req.query)}
Body: ${JSON.stringify(req.body)}
`;
        return next.handle().pipe(
            tap((data) => {
                const logFormat = ` ${requestContent} <<< ${JSON.stringify(data)}`;
                console.log(logFormat);
            }),
        );
        // return next.handle().pipe(
        //     map((data) => {
        //         const logFormat = ` ${requestContent} <<< ${JSON.stringify(data)}`;
        //         console.log("response", logFormat);
        //         // Logger.info(logFormat);
        //         // Logger.access(logFormat);
        //         return {
        //             statusCode: res.statusCode,
        //             errorCode: 0,
        //             method: req.method,
        //             path: req.url,
        //             date: new Date().toLocaleString(),
        //             message: "success",
        //             data,
        //         };
        //     }),
        // );
    }
}
