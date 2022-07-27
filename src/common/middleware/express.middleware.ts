/**
 * express 的中间件
 */
import { INestApplication, HttpException } from "@nestjs/common";
import compression from "compression";
import { json, urlencoded } from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";

// 函数式中间件
// 没有成员，没有额外的方法，没有依赖关系
export function expressMiddleware(app: INestApplication): INestApplication {
    const isProduction = process.env.NODE_ENV === "production";
    // 压缩
    // npm i --save compression
    // npm i --save-dev @types/compression
    // 当有反向代理时（nginx）不要使用它
    app.use(compression());
    // Helmet 安全 HTTP 头设置
    // npm i --save helmet
    // https://github.com/helmetjs/helmet
    app.use(
        helmet({
            contentSecurityPolicy: isProduction ? undefined : false,
            crossOriginEmbedderPolicy: isProduction ? undefined : false,
        }),
    );
    // 允许跨域的 HTTP 请求
    // https://github.com/expressjs/cors#configuration-options
    app.enableCors({
        origin: "*",
        // 允许 Access-Control-Allow-Credentials 头
        credentials: true,
        // 允许方法
        // patch 部分更新 put 为完整更新
        methods: "GET,PATCH,POST,DELETE",
        preflightContinue: false,
        optionsSuccessStatus: 204,
    });

    // For parsing application/json
    app.use(json());
    // For parsing application/x-www-form-urlencoded
    app.use(urlencoded({ extended: true }));

    // 限速 npm i --save express-rate-limit
    // https://github.com/nfriedly/express-rate-limit
    // 另一个中间件为 https://github.com/nestjs/throttler#readme
    app.use(
        rateLimit({
            // 5 分钟
            windowMs: 5 * 60 * 1000,
            // 限制 5 分钟内最多只能访问 300 次
            max: 300,
            // Return rate limit info in the `RateLimit-*` headers
            standardHeaders: false,
            // Disable the `X-RateLimit-*` headers
            legacyHeaders: isProduction ? false : true,
            // 响应处理
            handler: (_request, _response, _next, options) => {
                throw new HttpException(options.message, options.statusCode);
            },
        }),
    );

    return app;
}
