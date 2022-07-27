import { INestApplication, Logger as NestLogger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { HTTPS_OPTIONS } from "./common/constants";
import { expressMiddleware } from "./common/middleware";

async function bootstrap(): Promise<string> {
    // 开启 https 服务
    const app = await NestFactory.create<INestApplication>(AppModule, {
        httpsOptions: HTTPS_OPTIONS,
        // 是否打印日志
        // logger: false,
        bufferLogs: true,
    });

    // const isProduction = process.env.NODE_ENV === "production";
    // if (isProduction) {
    //     // see https://expressjs.com/en/guide/behind-proxies.html
    //     // 如果在服务器和以太网之间存在负载均衡或者反向代理，从而保证最终用户得到正确的IP地址
    //     // 要使用 NestExpressApplication 平台接口创建实例
    //     app.set("trust proxy", 1);
    // }

    // 引入全局中间件
    // 自定义中间件
    // express 中间件
    expressMiddleware(app);
    // 全局路由前缀
    // app.setGlobalPrefix("api");

    await app.listen(process.env.PORT || 443, "127.0.0.1");

    return app.getUrl();
}
(async (): Promise<void> => {
    // 补获全部错误
    try {
        const url = await bootstrap();
        NestLogger.log(url, "Bootstrap");
    } catch (error) {
        NestLogger.error(error, "Bootstrap");
    }
})();
