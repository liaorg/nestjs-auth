import { Module } from "@nestjs/common";
import { I18nModule } from "nestjs-i18n";
import { join } from "path";

@Module({
    imports: [
        // 国际化 i18n
        // npm install --save nestjs-i18n
        // https://github.com/toonvanstrijp/nestjs-i18n
        I18nModule.forRoot({
            fallbackLanguage: "zh-CN",
            loaderOptions: {
                path: join(__dirname, "../i18n"),
                watch: true,
            },
        }),
    ],
    // controllers: [],
    providers: [],
})
export class InitModule {}
