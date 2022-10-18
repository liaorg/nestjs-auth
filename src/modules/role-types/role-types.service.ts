import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RoleTypesEntity } from "./entities";

// 获取角色类型
@Injectable()
export class RoleTypesService {
    constructor(
        // 使用 @InjectRepository() 装饰器注入 存储库
        @InjectRepository(RoleTypesEntity) private repository: Repository<RoleTypesEntity>,
    ) {}

    // 根据角色类型获取角色菜单
    async findRoutesByType(roleType: number) {
        // return await this.repository.findOne({ roleType }).select("routes").lean();
        return await this.repository.findBy({ type: roleType });
    }
}
