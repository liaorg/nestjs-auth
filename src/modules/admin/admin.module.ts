import { databaseConfig } from "@/config";
import { Module } from "@nestjs/common";
// import { MODULE_PATH } from "@nestjs/common/constants";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MenuModule } from "./menu/menu.module";
import { RoleGroupModule } from "./role-group/role-group.module";
import { RoleModule } from "./role/role.module";
import { UserModule } from "./user/user.module";

// @SetMetadata(MODULE_PATH, "admin")
@Module({
    imports: [
        // 数据库配置
        TypeOrmModule.forRootAsync({ useFactory: () => databaseConfig }),
        RoleModule,
        RoleGroupModule,
        MenuModule,
        UserModule,
    ],
})
export class AdminModule {}
