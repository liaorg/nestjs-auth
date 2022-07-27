import { Module } from "@nestjs/common";
import { APP_FILTER } from "@nestjs/core";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AnyExceptionFilter, HttpExceptionFilters } from "./common/filters";
import { UsersModule } from "./users/users.module";

@Module({
    imports: [UsersModule],
    controllers: [AppController],
    providers: [
        // 全局异常处理
        {
            provide: APP_FILTER,
            useClass: AnyExceptionFilter,
        },
        // http 异常
        {
            provide: APP_FILTER,
            useClass: HttpExceptionFilters,
        },
        AppService,
    ],
})
export class AppModule {}
