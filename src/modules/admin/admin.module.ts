import { databaseConfig } from "@/config";
import { Module } from "@nestjs/common";
// import { MODULE_PATH } from "@nestjs/common/constants";
import { TypeOrmModule } from "@nestjs/typeorm";
import { I18nModule } from "nestjs-i18n";
import { join } from "path";
import { MenuModule } from "./menu/menu.module";
import { RoleGroupModule } from "./role-group/role-group.module";
import { RoleModule } from "./role/role.module";
import { UserModule } from "./user/user.module";

// @SetMetadata(MODULE_PATH, "admin")
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
        RoleModule,
        RoleGroupModule,
        MenuModule,
        UserModule,
    ],
})
export class AdminModule {}
