import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RoleTypesEntity } from "../role-types/entities";

// 获取路由菜单
@Injectable()
export class RouteMenusService {
    constructor(
        // 使用 @InjectRepository() 装饰器注入 存储库
        @InjectRepository(RoleTypesEntity) private repository: Repository<RoleTypesEntity>,
    ) {}

    // 根据角色类型获取角色菜单
    async findRoutesByType(roleTypeId: number) {
        // return await this.repository.findOne({ roleType }).select("routes").lean();
        return await this.repository.findBy({ type: roleTypeId });
    }
}
