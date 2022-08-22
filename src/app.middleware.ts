/**
 * 中间件
 */
import { HttpException } from "@nestjs/common";
import { NestFastifyApplication } from "@nestjs/platform-fastify";
import compression from "@fastify/compress";
import helmet from "@fastify/helmet";
// import cors from "@fastify/cors";
import rateLimit from "@fastify/rate-limit";

// 函数式中间件
// 没有成员，没有额外的方法，没有依赖关系
export async function appMiddleware(app: NestFastifyApplication): Promise<NestFastifyApplication> {
    const isProduction = process.env.NODE_ENV === "production";

    // Helmet 安全 HTTP 头设置
    // npm i --save @fastify/helmet
    // https://github.com/fastify/fastify-helmet
    app.register(helmet, {
        contentSecurityPolicy: isProduction
            ? {
                  directives: {
                      defaultSrc: [`'self'`],
                      styleSrc: [`'self'`, `'unsafe-inline'`],
                      imgSrc: [`'self'`, "data:", "validator.swagger.io"],
                      scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
                  },
              }
            : false,
        crossOriginEmbedderPolicy: isProduction ? undefined : false,
    });

    // 允许跨域的 HTTP 请求
    // npm i --save @fastify/cors
    // https://github.com/fastify/fastify-cors
    // app.enableCors({
    //     origin: "*",
    //     // 允许 Access-Control-Allow-Credentials 头
    //     credentials: true,
    //     // 允许方法
    //     // patch 部分更新 put 为完整更新
    //     methods: "HEAD,GET,PATCH,POST,DELETE",
    //     preflightContinue: false,
    //     optionsSuccessStatus: 204,
    // });
    // 允许跨域的 HTTP 请求
    // npm i --save @fastify/cors
    // https://github.com/fastify/fastify-cors
    // app.register(cors, {
    //     origin: "*",
    //     // 允许 Access-Control-Allow-Credentials 头
    //     credentials: true,
    //     // 允许方法
    //     // patch 部分更新 put 为完整更新
    //     methods: "HEAD,GET,PATCH,POST,DELETE",
    //     preflightContinue: false,
    //     optionsSuccessStatus: 204,
    // });

    // 限速 npm i --save @fastify/rate-limit
    // https://github.com/fastify/fastify-rate-limit
    const showRatelimitHeaders = true; //isProduction ? false : true;
    app.register(rateLimit, {
        // 5 分钟
        timeWindow: "1 minute",
        // 限制 5 分钟内最多只能访问 300 次
        max: 1,
        addHeadersOnExceeding: {
            // default show all the response headers when rate limit is not reached
            "x-ratelimit-limit": showRatelimitHeaders,
            "x-ratelimit-remaining": showRatelimitHeaders,
            "x-ratelimit-reset": showRatelimitHeaders,
        },
        addHeaders: {
            // default show all the response headers when rate limit is reached
            "x-ratelimit-limit": showRatelimitHeaders,
            "x-ratelimit-remaining": showRatelimitHeaders,
            "x-ratelimit-reset": showRatelimitHeaders,
            "retry-after": showRatelimitHeaders,
        },
        // 响应处理
        errorResponseBuilder: () => {
            throw new HttpException("Too many requests, please try again later.", 429);
        },
    });

    // 压缩
    // npm i --save fastify-compress
    // https://github.com/fastify/fastify-compress
    // 当有反向代理时（nginx）不要使用它
    app.register(compression, { encodings: ["gzip", "deflate"] });

    return app;
}
