import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import mongoose from "mongoose";
import { databaseConfig } from "@/config";
import { InitModule } from "./init.module";
import { I18nService } from "nestjs-i18n";
import { initDefaultData } from "./init-db";

const initLogger = new Logger("InitBootstrap", { timestamp: true });

// 连接数据库
async function connectdb(i18n: I18nService) {
    const logger = new Logger("db", { timestamp: true });
    try {
        await mongoose.connect(databaseConfig.uri);
        logger.log(i18n.t("init.dbConnected"));
    } catch (error) {
        logger.error(error);
        process.exit(1);
    }
}

// 启动应用
async function bootstrap() {
    const app = await NestFactory.createApplicationContext(InitModule);
    // application logic...
    const i18n = app.get(I18nService);
    initLogger.log(i18n.t("init.begainInit"));
    // 连接数据库
    await connectdb(i18n);
    const db = mongoose.connection;
    // 初始化默认用户，菜单，角色等
    await initDefaultData(db, i18n);

    initLogger.log(i18n.t("init.finishedInit"));
    await db.close();
    await app.close();
    process.exit(1);
}
(async (): Promise<void> => {
    try {
        await bootstrap();
    } catch (error) {
        initLogger.error(error);
        process.exit(1);
    }
})();
