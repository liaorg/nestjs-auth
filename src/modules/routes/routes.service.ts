import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Routes, RoutesDocument } from "./schemas";

// 获取路由菜单
@Injectable()
export class RoutesService {
    constructor(
        // 使用 @InjectModel() 装饰器注入 模型
        @InjectModel(Routes.name) private model: Model<RoutesDocument>,
    ) {}

    // 添加路由
    async create() {
        return await this.model.create();
    }
}
