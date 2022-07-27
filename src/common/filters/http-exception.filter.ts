import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Request, Response } from "express";
// import { Logger } from "src/utils/log4js";

// 使用 @Catch(HttpException) 装饰器注解的类
// 异常过滤器应该实现 ExceptionFilter 接口
// 这边拦截 http 异常
@Catch(HttpException)
export class HttpExceptionFilters implements ExceptionFilter<HttpException> {
    // 每个异常过滤器必须实现一个 catch 函数
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();

        const logFormat = ` <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    Request original url: ${request.originalUrl}
    Method: ${request.method}
    IP: ${request.ip}
    Status code: ${status}
    Response: ${exception.toString()} \n  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    `;

        console.log("http", logFormat);
        // 打印并记录日志
        // 根据状态码，进行日志类型区分
        // if (status >= 500) {
        //     Logger.error(logFormat);
        // } else if (status >= 400) {
        //     Logger.warn(logFormat);
        // } else {
        //     Logger.access(logFormat);
        //     Logger.log(logFormat);
        // }

        response.status(status).json({
            statusCode: status,
            date: new Date().toLocaleString(),
            path: request.url,
            message: exception.message,
        });
    }
}
