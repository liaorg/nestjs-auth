// import { Injectable } from "@nestjs/common";

import * as Log4js from "log4js";
import { inspect } from "util";
import { green, cyan, yellow, red, hex, grey } from "chalk";
import * as StackTrace from "stacktrace-js";
import { basename } from "path";
import { log4jsConfig } from "@/config";
// 应用 log4js
// npm install --save log4js stacktrace-js

// 日志级别
export enum LoggerLevel {
    ALL = "ALL",
    MARK = "MARK",
    TRACE = "TRACE",
    DEBUG = "DEBUG",
    INFO = "INFO",
    WARN = "WARN",
    ERROR = "ERROR",
    FATAL = "FATAL",
    OFF = "OFF",
}

// 内容跟踪类
export class ContextTrace {
    constructor(
        readonly context: string,
        readonly path?: string,
        readonly lineNumber?: number,
        readonly columnNumber?: number,
    ) {}
}

Log4js.addLayout("Awesome-nest", (logConfig: any) => {
    return (logEvent: Log4js.LoggingEvent): string => {
        let moduleName = "";
        let position = "";

        // 日志组装
        const messageList: string[] = [];
        logEvent.data.forEach((value: any) => {
            if (value instanceof ContextTrace) {
                moduleName = value.context;
                // 显示触发日志的坐标（行，列）
                if (value.lineNumber && value.columnNumber) {
                    position = `${value.lineNumber}, ${value.columnNumber}`;
                }
                return;
            }

            if (typeof value !== "string") {
                messageList.push(inspect(value, false, 3, true));
            } else {
                messageList.push(value);
            }
        });

        // 日志组成部分
        const messageOutput: string = messageList.join(" ");
        const positionOutput: string = position ? ` [${position}]` : "";
        const typeOutput = `[${logConfig.type}] ${logEvent.pid.toString()} - `;
        // const dateOutput = `${moment(logEvent.startTime).format("YYYY-MM-DD HH:mm:ss")}`;
        const dateOutput = `${logEvent.startTime}`;
        const moduleOutput: string = moduleName ? `[${moduleName}] ` : "[LoggerService] ";
        let levelOutput = `[${logEvent.level}] ${messageOutput}`;

        // 根据日志级别，用不同颜色区分
        switch (logEvent.level.toString()) {
            case LoggerLevel.DEBUG:
                levelOutput = green(levelOutput);
                break;
            case LoggerLevel.INFO:
                levelOutput = cyan(levelOutput);
                break;
            case LoggerLevel.WARN:
                levelOutput = yellow(levelOutput);
                break;
            case LoggerLevel.ERROR:
                levelOutput = red(levelOutput);
                break;
            case LoggerLevel.FATAL:
                levelOutput = hex("#DD4C35")(levelOutput);
                break;
            default:
                levelOutput = grey(levelOutput);
                break;
        }

        return `${green(typeOutput)}${dateOutput}  ${yellow(moduleOutput)}${levelOutput}${positionOutput}`;
    };
});

// 注入配置
Log4js.configure(log4jsConfig);

// 实例化
const logger = Log4js.getLogger("das");
logger.level = LoggerLevel.TRACE;

// @Injectable()
export class Logger {
    static trace(...args) {
        logger.trace(Logger.getStackTrace(), ...args);
    }

    static debug(...args) {
        logger.debug(Logger.getStackTrace(), ...args);
    }

    static log(...args) {
        logger.info(Logger.getStackTrace(), ...args);
    }

    static info(...args) {
        logger.info(Logger.getStackTrace(), ...args);
    }

    static warn(...args) {
        logger.warn(Logger.getStackTrace(), ...args);
    }

    static warning(...args) {
        logger.warn(Logger.getStackTrace(), ...args);
    }

    static error(...args) {
        logger.error(Logger.getStackTrace(), ...args);
    }

    static fatal(...args) {
        logger.fatal(Logger.getStackTrace(), ...args);
    }

    static access(...args) {
        const loggerCustom = Log4js.getLogger("http");
        loggerCustom.info(Logger.getStackTrace(), ...args);
    }

    // 日志追踪，可以追溯到哪个文件、第几行第几列
    static getStackTrace(deep = 2): string {
        const stackList: StackTrace.StackFrame[] = StackTrace.getSync();
        const stackInfo: StackTrace.StackFrame = stackList[deep];

        const lineNumber: number = stackInfo.lineNumber;
        const columnNumber: number = stackInfo.columnNumber;
        const fileName: string = stackInfo.fileName;
        const baseName: string = basename(fileName);
        return `${baseName}(line: ${lineNumber}, column: ${columnNumber}): \n`;
    }
}

// 自定义typeorm 日志器,https://blog.csdn.net/fwzzzzz/article/details/116160816