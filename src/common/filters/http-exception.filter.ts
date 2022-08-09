import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Request, Response } from "express";
import { ApiException } from "../exceptions";
import { Logger } from "../utils";

// 使用 @Catch(HttpException) 装饰器注解的类
// 异常过滤器应该实现 ExceptionFilter 接口
// 这边拦截 http 请求异常
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
    // 每个异常过滤器必须实现一个 catch 函数
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();

        const date = new Date().toLocaleString();
        const logFormat = ` <<< ${status} ${exception.toString()}`;
        // console.log(logFormat);
        // 打印并记录日志
        // 根据状态码，进行日志类型区分
        if (status >= 500) {
            Logger.error(logFormat);
        } else if (status >= 400) {
            Logger.warn(logFormat);
        } else {
            Logger.access(logFormat);
            // Logger.log(logFormat);
        }

        let errorCode = 0;
        let message: string | object = exception.message;
        if (exception instanceof ApiException) {
            // 如果是业务异常
            errorCode = exception.getErrorCode();
            message = exception.getErrorMessage();
        }
        response.status(status).json({
            statusCode: status,
            errorCode: errorCode,
            method: request.method,
            path: request.url,
            date: date,
            message: message,
        });
    }
}
