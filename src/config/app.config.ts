import dayjs from "dayjs";

export interface AppConfig {
    timezone?: string;
    locale: string;
}

/**
 * 分页验证DTO接口
 *
 * @export
 * @interface PaginateDto
 */
export interface PaginateDto {
    page: number;
    limit: number;
}

export interface TimeOptions {
    date?: dayjs.ConfigType;
    format?: dayjs.OptionType;
    locale?: string;
    strict?: boolean;
    zonetime?: string;
}

/**
 * 应用配置
 */
export const appConfig: () => AppConfig = () => ({
    // 默认显示时的时区
    // 写入时建议不设置时区，即保持UTF0时区，时间统一在应用读取时转换
    timezone: "Asia/Shanghai",
    // 默认语言
    locale: "zh-cn",
});
