import { Logger } from "../utils";

// 函数式中间件
// 没有成员，没有额外的方法，没有依赖关系
export function logger(req, res, next) {
    next();
    // 响应状态码
    const code = res.statusCode;
    // 组装日志信息
    const url = req.originalUrl ?? req.url;
    let requestContent = ` >>> ${code} ${req.method} ${req.ip} ${url}`;
    requestContent += req["user"] ? `user: ${JSON.stringify(req["user"])}` : "";
    // // requestContent += `\nHeaders: ${JSON.stringify(req.headers)}`;
    // requestContent += Object.keys(req.params).length ? `\nParmas: ${JSON.stringify(req.params)}` : "";
    // requestContent += Object.keys(req.query).length ? `\nQuery: ${JSON.stringify(req.query)}` : "";
    // requestContent += Object.keys(req.body).length ? `\nBody: ${JSON.stringify(req.body)}` : "";

    // 根据状态码，进行日志类型区分
    if (code >= 500) {
        Logger.error(requestContent);
    } else if (code >= 400) {
        Logger.warn(requestContent);
    } else {
        Logger.access(requestContent);
        // Logger.log(requestContent);
    }
}

// 使用 @Injectable() 装饰器注解的类
// 中间件应该实现 NestMiddleware 接口
// @Injectable()
// export class LoggerMiddleware implements NestMiddleware {
//     // 每个 class 中间件必须实现一个 use 函数
//     use(req: Request, res: Response, next: NextFunction) {
//         console.log(req.url, req.method, res.statusCode, "class middleware");
//         const code = res.statusCode; // 响应状态码
//         next();
//         // 组装日志信息
//         const logFormat = `Method: ${req.method} \n Request original url: ${req.originalUrl} \n IP: ${req.ip} \n Status code: ${code} \n`;
//         // 根据状态码，进行日志类型区分
//         if (code >= 500) {
//             Logger.error(logFormat);
//         } else if (code >= 400) {
//             Logger.warn(logFormat);
//         } else {
//             Logger.access(logFormat);
//             Logger.log(logFormat);
//         }
//     }
// }

// 函数式中间件
// 当中间件没有任何依赖关系时使用函数式中间件
// export function logger(req: Request, res: Response, next: NextFunction) {
//     console.log(req.url, req.method, res.statusCode, "function middleware");
//     next();
// }
