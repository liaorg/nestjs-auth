import { INestApplication, Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { appMiddleware } from "./app.middleware";
import { AppModule } from "./app.module";
import { HTTPS_OPTIONS } from "./common/constants";

// 热模块更换
// declare const module: any;

async function bootstrap(): Promise<string> {
    const isProduction = process.env.NODE_ENV === "production";
    // 开启 https 服务
    const app = await NestFactory.create<INestApplication>(AppModule, {
        httpsOptions: HTTPS_OPTIONS,
        // 是否打印日志
        logger: isProduction ? false : ["log"],
        bufferLogs: true,
    });

    // if (isProduction) {
    //     // see https://expressjs.com/en/guide/behind-proxies.html
    //     // 如果在服务器和以太网之间存在负载均衡或者反向代理，从而保证最终用户得到正确的IP地址
    //     // 要使用 NestExpressApplication 平台接口创建实例
    //     app.set("trust proxy", 1);
    // }

    // 引入全局中间件
    appMiddleware(app);
    // 全局路由前缀
    app.setGlobalPrefix("admin");

    // listen EACCES: permission denied 0.0.0.0:443 时执行以下脚本
    // sudo apt-get install libcap2-bin
    // sudo setcap cap_net_bind_service=+ep `readlink -f \`which node\``
    await app.listen(process.env.PORT || 443, "0.0.0.0");

    // 热模块更换
    // "start:dev": "nest start --watch", 替换成如下：
    // "start:dev": "nest build --webpack --webpackPath webpack-hmr.config.js --watch"
    // if (module.hot) {
    //     module.hot.accept();
    //     module.hot.dispose(() => app.close());
    // }

    return app.getUrl();
}
(async (): Promise<void> => {
    try {
        const url = await bootstrap();
        Logger.log(url, "Bootstrap");
    } catch (error) {
        Logger.error(error, "Bootstrap");
        process.exit(1);
    }
})();
