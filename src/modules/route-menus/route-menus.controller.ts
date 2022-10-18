import { Controller, Get } from "@nestjs/common";
import { RequestUserDecorator } from "../auth/decorators/request-user.decorator";
import { RequestUserDto } from "../auth/dto";
import { RouteMenusService } from "./route-menus.service";

// 路由菜单管理

@Controller("route-menus")
export class RouteMenusController {
    constructor(private readonly service: RouteMenusService) {}

    // 获取用户菜单
    @Get()
    async findAll(@RequestUserDecorator() user: RequestUserDto) {
        // 获取登录用户的角色
        const { roleType, routePath } = user;
        // 根据角色类型获取角色菜单
        const roleRoutes = await this.service.findRoutesByType(roleType);
        // return await this.filterUserRoutes(roleRoutes.routes, routePath);
        return await this.filterUserRoutes(roleRoutes, routePath);
    }

    // 根据用户权限获取路由菜单
    async filterUserRoutes(roleRoutes, routePath): Promise<any> {
        return roleRoutes.filter((route) => {
            // 嵌套子路由
            if (route.children?.length) {
                return this.filterUserRoutes(route.children, routePath);
            }
            return routePath.indexOf(route.path) > -1;
        });
    }
}
