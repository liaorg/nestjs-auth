import dayjs from "dayjs";
// dayjs 语言包 [https://dayjs.fenxianglu.cn/]
import "dayjs/locale/en";
import "dayjs/locale/zh-cn";
// dayjs 插件
import advancedFormat from "dayjs/plugin/advancedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";
import dayOfYear from "dayjs/plugin/dayOfYear";
import localeData from "dayjs/plugin/localeData";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

import { appConfig, TimeOptions } from "@/config";

dayjs.extend(localeData);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(advancedFormat);
dayjs.extend(customParseFormat);
dayjs.extend(dayOfYear);

/**
 * 用于展示时间的对象
 * 用户所在时区或设置的时区 zonetime|config.timezone
 * @param options
 * @returns
 */
export const getTime = (options?: TimeOptions) => {
    if (!options) return dayjs();
    const { date, format, locale, strict, zonetime } = options;
    const config = appConfig();
    // 每次创建一个新的时间对象
    // 如果没有传入local或timezone则使用应用配置
    const now = dayjs(date, format, locale ?? config.locale, strict).clone();
    return now.tz(zonetime ?? config.timezone);
};

/**
 * 用于存储时间的对象
 * 获取 0 时区的时间
 * @param options
 * @returns
 */
export const getUTCTime = (options?: TimeOptions) => {
    return getTime(options).utc();
};

export { dayjs };
