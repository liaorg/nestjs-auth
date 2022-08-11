import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { join, resolve } from "path";

export const resolveDir = (dir: string) => join(resolve(__dirname, "../../"), dir);
// 这里大家可以打印一下路径
// __dirname： ./dist/config
// 惊讶的发现，目录是dist目录中的config路径

export const databaseConfig: TypeOrmModuleOptions = {
    // https://typeorm.io/#/connection-options/common-connection-options
    type: "mongodb",
    // name: "nest",
    synchronize: false, // 从entities属性产生SQL，并创建表格
    logging: ["error"], // 执行SQL会打印在控制台中 query error
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT, 10) || 27017,
    // username: process.env.DB_USER || "root",
    // password: process.env.DB_PASSWORD || "123456",
    database: process.env.DB_NAME || "nest",
    autoLoadEntities: true, // 自动载入实体
    // 这里对应的路径是 ./dist/**/*.entity{.ts,.js}
    // 即 dist 目录中，所有以 .entity.ts 或者 .entity.js 结尾的文件
    // TypeORM读取的实体类的文件夹，及文件名
    // entities: [resolveDir("dist") + "/**/*.entity{.ts,.js}"],
    extra: {
        connectionLimit: 30,
    },
    useUnifiedTopology: true,
};
