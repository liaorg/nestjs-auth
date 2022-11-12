import dayjs from "dayjs";

export interface AppConfig {
    // 默认显示时的时区
    timezone?: string;
    // 默认语言
    locale: string;
    // 管理页面路由前缀
    adminPrefix: string;
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
export const appConfig = {
    // 默认显示时的时区
    // 写入时建议不设置时区，即保持UTF0时区，时间统一在应用读取时转换
    timezone: "Asia/Shanghai",
    // 默认语言
    locale: "zh-cn",
    // 管理页面路由前缀， 注意结尾要加 /
    adminPrefix: "admin/",
    jwt: {
        // 秘钥
        secret: "my-secret",
        // 过期时间 毫秒
        tokenExpired: 3600,
        refreshSecret: "my-refresh-secret",
        refreshTokenExpired: 3600 * 30,
    },
};
