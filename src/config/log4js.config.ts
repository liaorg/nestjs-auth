/*
 * @Description: log4js的配置文件
 */

import { resolve } from "node:path";
const baseLogPath = resolve(__dirname, "../../logs"); // 日志要写入哪个目录

export const log4jsConfig = {
    // 日志输出到哪里
    appenders: {
        console: {
            // 会打印到控制台，使用标准输出，会比console的性能高
            type: "stdout",
            // 是否直接跳过头部生成
            // layout: { type: "messagePassThrough" },
            layout: { type: "DAS" },
        },
        // 初始化日志
        init: {
            type: "dateFile", // 会写入文件，并按照日期分类
            filename: `${baseLogPath}/init/init.log`, // 日志文件名，会命名为：init.20200320.log
            alwaysIncludePattern: true, // 为true, 则每个文件都会按pattern命名，否则最新的文件不会按照pattern命名
            // pattern: "yyyyMMdd",
            layout: { type: "DAS" },
            daysToKeep: 60, // 文件保存日期60天
            numBackups: 3, //  配置日志文件最多存在个数
            compress: true, // 配置日志文件是否压缩
            category: "http", // category 类型
            keepFileExt: true, // 是否保留文件后缀
        },
        // 统计日志
        access: {
            type: "dateFile", // 会写入文件，并按照日期分类
            filename: `${baseLogPath}/access/access.log`, // 日志文件名，会命名为：access.20200320.log
            alwaysIncludePattern: true, // 为true, 则每个文件都会按pattern命名，否则最新的文件不会按照pattern命名
            // pattern: "yyyyMMdd",
            layout: {
                type: "pattern",
                // pattern: '{"date":"%d","level":"%p","category":"%c","host":"%h","pid":"%z","data":\'%m\'}',
                pattern: "[%d{yyyy-MM-dd hh:mm:ss}] [%p] %c %m ",
            },
            daysToKeep: 60, // 文件保存日期60天
            numBackups: 3, //  配置日志文件最多存在个数
            compress: true, // 配置日志文件是否压缩
            category: "http", // category 类型
            keepFileExt: true, // 是否保留文件后缀
        },
        // 一些 app 的 应用日志
        app: {
            type: "dateFile",
            filename: `${baseLogPath}/app-out/app.log`,
            alwaysIncludePattern: true,
            // 自定义每一条输出日志的格式
            layout: {
                type: "pattern",
                // pattern: '{"date":"%d","level":"%p","category":"%c","host":"%h","pid":"%z","data":\'%m\'}',
                pattern: "[%d{yyyy-MM-dd hh:mm:ss}] [%p] -h: %h -pid: %z msg: '%m' ",
            },
            // 日志文件按日期（天）切割
            pattern: "yyyyMMdd",
            daysToKeep: 60,
            // maxLogSize: 10485760,
            numBackups: 3,
            compress: true,
            keepFileExt: true,
        },
        // 异常日志
        errorFile: {
            type: "dateFile",
            filename: `${baseLogPath}/errors/error.log`,
            alwaysIncludePattern: true,
            layout: {
                type: "pattern",
                pattern: "[%d{yyyy-MM-dd hh:mm:ss}] [%p] -h: %h -pid: %z msg: '%m' ",
            },
            // 日志文件按日期（天）切割
            pattern: "yyyyMMdd",
            daysToKeep: 60,
            // maxLogSize: 10485760,
            numBackups: 3,
            keepFileExt: true,
        },
        errors: {
            // 过滤指定level的文件
            type: "logLevelFilter",
            level: "error",
            appender: "errorFile",
        },
    },
    categories: {
        default: {
            appenders: ["console", "access", "app", "errors"],
            level: "debug",
        },
        info: { appenders: ["console", "app", "errors"], level: "info" },
        http: { appenders: ["console", "access"], level: "debug" },
        mysql: { appenders: ["console", "access", "errors"], level: "info" },
    },
    //pm2: true, // 使用 pm2 来管理项目时，打开
    //pm2InstanceVar: "INSTANCE_ID", // 会根据 pm2 分配的 id 进行区分，以免各进程在写日志时造成冲突
};
