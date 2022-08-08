import { Module } from "@nestjs/common";
import { APP_FILTER, APP_INTERCEPTOR } from "@nestjs/core";
import { ServeStaticModule } from "@nestjs/serve-static";
import { I18nModule } from "nestjs-i18n";
import { join } from "path";
import { AnyExceptionFilter, HttpExceptionFilter } from "./common/filters";
import { TransformInterceptor } from "./common/interceptors";
import { UsersModule } from "./modules/users/users.module";

@Module({
    imports: [
        // 静态服务
        // npm install --save @nestjs/serve-static
        // https://docs.nestjs.com/recipes/serve-static
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, "..", "public"),
            renderPath: "/",
        }),
        // 国际化 i18n
        // npm install --save nestjs-i18n
        // https://github.com/toonvanstrijp/nestjs-i18n
        I18nModule.forRoot({
            fallbackLanguage: "zh-CN",
            loaderOptions: {
                path: join(__dirname, "i18n"),
                watch: true,
            },
        }),
        UsersModule,
        // 路由模块 Module Router
        // https://docs.nestjs.com/recipes/router-module
        // RouterModule.register([
        //     {
        //         path: "admin",
        //         module: AdminModule,
        //         children: [UsersModule],
        //     },
        //     {
        //         path: "api",
        //         module: ApiModule,
        //     },
        // ]),
    ],
    // controllers: [],
    providers: [
        // 全局响应映射
        {
            provide: APP_INTERCEPTOR,
            useClass: TransformInterceptor,
        },
        // 全局异常处理，从下往上执行
        {
            provide: APP_FILTER,
            useClass: AnyExceptionFilter,
        },
        // 全局 http 异常
        {
            provide: APP_FILTER,
            useClass: HttpExceptionFilter,
        },
    ],
})
export class AppModule {}
