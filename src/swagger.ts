/**
 * 配置 Swagge
 * https://docs.nestjs.com/recipes/swagger
 * npm install --save @nestjs/swagger swagger-ui-express
 *
 * 开发中运行 npm run start:doc
 */

import { INestApplication, Logger as NestLogger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap(): Promise<string> {
    // 开启 https 服务
    const app = await NestFactory.create<INestApplication>(AppModule);

    // 配置 Swagge
    const swaggeConfig = new DocumentBuilder()
        // 开启 BearerAuth 授权认证
        .addBearerAuth()
        .setTitle("管理后台")
        .setDescription("管理后台接口")
        .setVersion("v1.0")
        .build();
    const swaggeDocument = SwaggerModule.createDocument(app, swaggeConfig);
    // SwaggerModule.setup("doc", app, swaggeDocument);
    SwaggerModule.setup("", app, swaggeDocument);
    await app.listen(8000, "127.0.0.1");

    return app.getUrl();
}
(async (): Promise<void> => {
    try {
        const url = await bootstrap();
        NestLogger.log(url, "Bootstrap");
    } catch (error) {
        NestLogger.error(error, "Bootstrap");
    }
})();
