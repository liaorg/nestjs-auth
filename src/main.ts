import { Logger as NestLogger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";
import { appMiddleware } from "./app.middleware";
import { AppModule } from "./app.module";
import { HTTPS_OPTIONS } from "./common/constants";

async function bootstrap(): Promise<string> {
    // const isProduction = process.env.NODE_ENV === "production";
    // 开启 https 服务
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter({
            http2: true,
            https: HTTPS_OPTIONS,
            // 是否打印日志
            // logger: isProduction ? false : true,
        }),
    );

    // if (isProduction) {
    //     // see https://expressjs.com/en/guide/behind-proxies.html
    //     // 如果在服务器和以太网之间存在负载均衡或者反向代理，从而保证最终用户得到正确的IP地址
    //     // 要使用 NestExpressApplication 平台接口创建实例
    //     app.set("trust proxy", 1);
    // }

    app.enableCors({
        origin: "*",
        // 允许 Access-Control-Allow-Credentials 头
        credentials: true,
        // 允许方法
        // patch 部分更新 put 为完整更新
        methods: "HEAD,GET,PATCH,POST",
        preflightContinue: false,
        optionsSuccessStatus: 204,
    });

    // 引入全局中间件
    appMiddleware(app);
    // 全局路由前缀
    // app.setGlobalPrefix("api");

    // listen EACCES: permission denied 0.0.0.0:443 时执行以下脚本
    // sudo apt-get install libcap2-bin
    // sudo setcap cap_net_bind_service=+ep `readlink -f \`which node\``
    await app.listen(process.env.PORT || 443, "0.0.0.0");

    return app.getUrl();
}
(async (): Promise<void> => {
    try {
        const url = await bootstrap();
        NestLogger.log(url, "Bootstrap");
    } catch (error) {
        NestLogger.error(error, "Bootstrap");
        process.exit(1);
    }
})();
