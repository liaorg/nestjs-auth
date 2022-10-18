import { Module } from "@nestjs/common";
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from "@nestjs/core";
import { TypeOrmModule } from "@nestjs/typeorm";
import { I18nModule } from "nestjs-i18n";
import { join } from "path";
import { AnyExceptionFilter, HttpExceptionFilter } from "./common/filters";
import { TransformInterceptor } from "./common/interceptors";
import { RequestValidationSchemaPipe } from "./common/pipes";
import { databaseConfig } from "./config";
import { AuthModule } from "./modules/auth/auth.module";
// import { RolesModule } from "./modules/roles/roles.module";
// import { RouteMenusModule } from "./modules/route-menus/route-menus.module";

@Module({
    imports: [
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
        // 数据库配置
        TypeOrmModule.forRootAsync({ useFactory: () => databaseConfig }),
        // 其他模块
        AuthModule,
        // RolesModule,
        // RouteMenusModule,
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
        // 全局 request 参数验证
        {
            provide: APP_PIPE,
            useClass: RequestValidationSchemaPipe,
        },
    ],
})
export class AppModule {}
