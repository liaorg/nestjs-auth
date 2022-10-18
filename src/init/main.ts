import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { InitModule } from "./init.module";
import { I18nService } from "nestjs-i18n";
import { initDefaultData } from "./init-db";

const initLogger = new Logger("InitBootstrap", { timestamp: true });

// 启动应用
async function bootstrap() {
    const app = await NestFactory.createApplicationContext(InitModule);
    // application logic...
    const i18n = app.get(I18nService);
    initLogger.log(i18n.t("init.begainInit"));
    // 初始化默认用户，路由菜单，角色类型，角色等
    await initDefaultData(i18n);

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
