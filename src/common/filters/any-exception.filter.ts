import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { Request, Response } from "express";
import { Logger } from "../utils";

/**
 * 捕获所有异常
 */

@Catch()
export class AnyExceptionFilter implements ExceptionFilter {
    // 每个异常过滤器必须实现一个 catch 函数
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

        const logFormat = ` <<< ${status} ${exception.stack()}`;
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

        response.status(status).json({
            statusCode: status,
            method: request.method,
            path: request.url,
            date: new Date().toLocaleString(),
            message: "Internal Server Error",
        });
    }
}
