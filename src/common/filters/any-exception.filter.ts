import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { Logger } from "../utils";

/**
 * 捕获所有异常
 */

@Catch()
export class AnyExceptionFilter implements ExceptionFilter {
    // 每个异常过滤器必须实现一个 catch 函数
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

        // 组装日志信息
        const url = request.originalUrl ?? request.url;
        let requestContent = `>>> ${response.statusCode} ${request.method} ${request.ip} ${url}`;
        requestContent += request["user"] ? `\nuser: ${JSON.stringify(request["user"])}` : "";
        // // requestContent += `\nHeaders: ${JSON.stringify(req.headers)}`;
        requestContent += Object.keys(request.params ?? {}).length ? `\nParmas: ${JSON.stringify(request.params)}` : "";
        requestContent += Object.keys(request.query ?? {}).length ? `\nQuery: ${JSON.stringify(request.query)}` : "";
        requestContent += Object.keys(request.body ?? {}).length ? `\nBody: ${JSON.stringify(request.body)}` : "";

        // console.log("exception", exception);
        let logFormat = `${requestContent}\n <<< ${status}`;
        if (typeof exception.stack === "function") {
            logFormat += ` ${exception.stack()}`;
        } else {
            logFormat += ` ${exception.stack}`;
        }
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

        response.status(status).send({
            statusCode: status,
            method: request.method,
            path: request.url,
            date: new Date().toLocaleString(),
            message: "Internal Server Error",
        });
    }
}
