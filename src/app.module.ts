import { Module } from "@nestjs/common";
import { APP_FILTER, APP_INTERCEPTOR } from "@nestjs/core";
import { ServeStaticModule } from "@nestjs/serve-static";
import { I18nModule } from "nestjs-i18n";
import path from "path";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AnyExceptionFilter, HttpExceptionFilter } from "./common/filters";
import { TransformInterceptor } from "./common/interceptors";
import { UsersModule } from "./modules/users/users.module";

@Module({
    imports: [
        // 静态服务
        // npm install --save @nestjs/serve-static
        // https://docs.nestjs.com/recipes/serve-static
        ServeStaticModule.forRoot({
            rootPath: `${__dirname}/../public`,
            renderPath: "/",
        }),
        // 国际化 i18n
        // npm install --save nestjs-i18n
        // https://github.com/toonvanstrijp/nestjs-i18n
        I18nModule.forRoot({
            fallbackLanguage: "zh-CN",
            loaderOptions: {
                path: path.join(__dirname, "/i18n/"),
                watch: true,
            },
        }),
        UsersModule,
    ],
    controllers: [AppController],
    providers: [
        // 响应映射
        {
            provide: APP_INTERCEPTOR,
            useClass: TransformInterceptor,
        },
        // 全局异常处理
        {
            provide: APP_FILTER,
            useClass: AnyExceptionFilter,
        },
        // http 异常
        {
            provide: APP_FILTER,
            useClass: HttpExceptionFilter,
        },
        AppService,
    ],
})
export class AppModule {}
