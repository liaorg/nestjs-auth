import { Module } from "@nestjs/common";
import { AuthService } from "./auth/auth.service";
import { PermissionService } from "./permission/permission.service";

@Module({
    providers: [AuthService, PermissionService],
    // 暴露服务  暴露出去以后引入当前模块的模块就可以使用当前模块里面的服务
    exports: [PermissionService, AuthService],
})
export class SharedModule {}
