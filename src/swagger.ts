/**
 * 配置 Swagge
 * https://docs.nestjs.cn/9/recipes?id=swagger
 * npm install --save @nestjs/swagger swagger-ui-express
 *
 * 开发中运行 npm run start:doc
 */

import { Logger as NestLogger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

// https://docs.nestjs.cn/9/openapi

async function bootstrap(): Promise<string> {
    // 开启 https 服务
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    // 配置 Swagge
    const swaggeConfig = new DocumentBuilder()
        // 开启 BearerAuth 授权认证
        .addBearerAuth()
        .setTitle("管理后台")
        .setDescription("管理后台接口")
        .setVersion("v1.0")
        .build();
    try {
        const swaggeDocument = SwaggerModule.createDocument(app, swaggeConfig);
        const prefix = "doc";
        SwaggerModule.setup(prefix, app, swaggeDocument);

        await app.listen(6200, "127.0.0.1");
        return app.getUrl();
    } catch (error) {
        console.log("swagge", error);
        process.exit(1);
    }
}
(async (): Promise<void> => {
    try {
        const url = await bootstrap();
        const prefix = "doc";
        NestLogger.log(url + `/${prefix}`, "swagge");
        NestLogger.log(url + `/${prefix}-json`, "Swagger JSON");
    } catch (error) {
        console.log("swagge", error);
    }
})();
