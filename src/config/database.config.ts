/**
 * sqllite3 配置
 */
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { join, resolve } from "path";

export const resolveDir = (dir: string) => join(resolve(__dirname, "../../"), dir);
// 这里大家可以打印一下路径
// __dirname： ./dist/config
// 惊讶的发现，目录是dist目录中的config路径

export const databaseConfig: TypeOrmModuleOptions = {
    // https://typeorm.io/data-source-options
    type: "sqlite",
    synchronize: false, // 从entities属性产生SQL，并创建表格
    // logging: ["query", "warn", "schema", "info", "log", "error"], // 执行SQL会打印在控制台中 query error
    logging: ["query", "warn", "error"], // 执行SQL会打印在控制台中 query error
    // logging: ["error"], // 执行SQL会打印在控制台中 query error
    maxQueryExecutionTime: 1000, // 记录所有运行超过1秒的查询
    // logger: "file",
    database: process.env.AUTHDB || "/mnt/sqlite-data/auth.db",
    autoLoadEntities: true, // 自动载入实体
    // 这里对应的路径是 ./dist/**/*.entity{.ts,.js}
    // 即 dist 目录中，所有以 .entity.ts 或者 .entity.js 结尾的文件
    // TypeORM读取的实体类的文件夹，及文件名
    entities: [resolveDir("dist") + "/**/*.entity{.ts,.js}"],
    extra: {
        connectionLimit: 30,
    },
    // type = better-sqlite3
    // 缓存sqlite语句的大小以加快查询速度
    // statementCacheSize: 100,
};
