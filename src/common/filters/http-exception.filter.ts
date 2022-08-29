import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import {
    getI18nContextFromArgumentsHost,
    I18nContext,
    I18nValidationError,
    I18nValidationException,
} from "nestjs-i18n";
import { ApiError } from "../constants";
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
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception.getStatus();

        // 组装日志信息
        const url = request.originalUrl ?? request.url;
        let requestContent = `>>> ${response.statusCode} ${request.method} ${request.ip} ${url}`;
        requestContent += request["user"] ? `\nuser: ${JSON.stringify(request["user"])}` : "";
        // // requestContent += `\nHeaders: ${JSON.stringify(req.headers)}`;
        requestContent += Object.keys(request.params ?? {}).length ? `\nParmas: ${JSON.stringify(request.params)}` : "";
        requestContent += Object.keys(request.query ?? {}).length ? `\nQuery: ${JSON.stringify(request.query)}` : "";
        requestContent += Object.keys(request.body ?? {}).length ? `\nBody: ${JSON.stringify(request.body)}` : "";

        let logFormat = `${requestContent}\n <<< ${status} ${exception.toString()}`;
        let errorCode = ApiError.unknowError.errorCode;
        let message: string | object = exception.message;
        if (exception instanceof I18nValidationException) {
            // i18n 参数校验异常
            const errors = exception.errors ?? [];
            if (errors.length > 0) {
                // 获取到第一个没有通过验证的错误对象
                const error = errors.shift();
                const i18n = getI18nContextFromArgumentsHost(host);
                // 翻译参数校验提示信息
                this.translateErrors([error], i18n);
                message = `${error.property}|${Object.values(error.constraints)}`;
            }
            logFormat = `${requestContent}\n <<< ${status} ${exception}`;
        }
        if (exception instanceof ApiException) {
            // 如果是业务异常
            const i18n = getI18nContextFromArgumentsHost(host);
            const errors = exception.getErrors();
            errorCode = errors?.errorCode ?? ApiError.unknowError.errorCode;
            // 翻译提示信息
            const langKeyword = errors?.langKeyword ?? ApiError.unknowError.langKeyword;
            const args = errors?.args ?? {};
            message = i18n.t(langKeyword, { args });
            logFormat += ` ${errorCode}`;
        }
        logFormat += ` ${message}`;
        // console.log("exception", exception);
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
        const date = new Date().toLocaleString();
        response.status(status).send({
            statusCode: status,
            errorCode: errorCode,
            method: request.method,
            path: request.url,
            date: date,
            message: message,
        });
    }

    // 翻译参数校验提示信息
    private translateErrors(errors: I18nValidationError[], i18n: I18nContext): I18nValidationError[] {
        return errors.map((error) => {
            error.children = this.translateErrors(error.children ?? [], i18n);
            error.constraints = Object.keys(error.constraints).reduce((result, key) => {
                const [translationKey, argsString] = error.constraints[key].split("|");
                const args = !!argsString ? JSON.parse(argsString) : {};
                result[key] = i18n.t(translationKey, {
                    args: { property: error.property, ...args },
                });
                return result;
            }, {});
            return error;
        });
    }
}
