/**
 * openi api swagger 中间件
 */
import { NestExpressApplication } from "@nestjs/platform-express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

// 函数式中间件
// 没有成员，没有额外的方法，没有依赖关系
export function swaggerMiddleware(app: NestExpressApplication): string {
    // 配置 Swagge
    const swaggeConfig = new DocumentBuilder()
        // 开启 BearerAuth 授权认证
        .addBearerAuth()
        .setTitle("管理后台")
        .setDescription("管理后台接口")
        .setVersion("v1.0")
        .build();
    const prefix = "doc";
    try {
        const swaggeDocument = SwaggerModule.createDocument(app, swaggeConfig);
        SwaggerModule.setup(prefix, app, swaggeDocument);
    } catch (error) {
        console.log("swagge", error);
    }
    return prefix;
}
