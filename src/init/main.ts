import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { InitModule } from "./init.module";
import { I18nService } from "nestjs-i18n";
import { initDefaultData } from "./init-db";
import minimist from "minimist";
import { addAdminApiData } from "./add-admin-api";
import { adminApiData } from "./upgrade";

const initLogger = new Logger("InitBootstrap", { timestamp: true });

// 启动应用
async function bootstrap() {
    const app = await NestFactory.createApplicationContext(InitModule);
    // application logic...
    const i18n = app.get(I18nService);
    // 获取命令行参数
    const argvs = minimist(process.argv.slice(2));
    // console.log("argvs", argvs);

    // 初始化默认用户，路由菜单，角色类型，角色等
    // node dist/init/main.js --init
    if (argvs.init === true) {
        initLogger.log(i18n.t("init.begainInit"));
        await initDefaultData(i18n);
        initLogger.log(i18n.t("init.finishedInit"));
    } else if (argvs.add === "adminApi") {
        // 升级时用
        // node dist/init/main.js --add adminApi
        await addAdminApiData(adminApiData, i18n);
    } else {
        initLogger.log(i18n.t("init.requiredParam"));
    }
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
