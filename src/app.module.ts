import { Module } from "@nestjs/common";
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from "@nestjs/core";
import { AnyExceptionFilter, HttpExceptionFilter } from "./common/filters";
import { TransformInterceptor } from "./common/interceptors";
import { RequestValidationSchemaPipe } from "./common/pipes";
import { AdminModule } from "./modules/admin/admin.module";

@Module({
    imports: [
        AdminModule,
        // 路由模块 Module Router
        // https://docs.nestjs.com/recipes/router-module
        // RouterModule.register([
        //     {
        //         path: "admin",
        //         module: AdminModule,
        //     },
        //     // {
        //     //     path: "api",
        //     //     module: ApiModule,
        //     // },
        // ]),
    ],
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
