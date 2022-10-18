import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RoutesEntity } from "./entities";

// 获取路由菜单
@Injectable()
export class RoutesService {
    constructor(
        // 使用 @InjectRepository() 装饰器注入 存储库
        @InjectRepository(RoutesEntity) private repository: Repository<RoutesEntity>,
    ) {}

    // 添加路由
    async create() {
        return this.repository.create();
    }
}
