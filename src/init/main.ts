import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { InitModule } from "./init.module";
import { I18nService } from "nestjs-i18n";
import { initDefaultData } from "./init-db";
import minimist from "minimist";

const initLogger = new Logger("InitBootstrap", { timestamp: true });

// 启动应用
async function bootstrap() {
    const app = await NestFactory.createApplicationContext(InitModule);
    // application logic...
    const i18n = app.get(I18nService);
    initLogger.log(i18n.t("init.begainInit"));
    // 获取命令行参数
    const argvs = minimist(process.argv.slice(2));
    // console.log("argvs", argvs);

    // 初始化默认用户，路由菜单，角色类型，角色等
    // node dist/init/main.js --init
    if (argvs.init === true) {
        await initDefaultData(i18n);
    } else {
        initLogger.log(i18n.t("init.requiredParam"));
    }
    initLogger.log(i18n.t("init.finishedInit"));
    await app.close();
}
(async (): Promise<void> => {
    try {
        await bootstrap();
    } catch (error) {
        initLogger.error(error);
        process.exit(1);
    }
})();
