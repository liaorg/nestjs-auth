import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { RoleTypes, RoleTypesDocument } from "./schemas/role-types.schema";

// 获取角色类型
@Injectable()
export class RoleTypesService {
    constructor(
        // 使用 @InjectModel() 装饰器注入 模型
        @InjectModel(RoleTypes.name) private model: Model<RoleTypesDocument>,
    ) {}

    // 根据角色类型获取角色菜单
    async findRoutesByType(roleType: number) {
        return await this.model.findOne({ roleType }).select("routes").lean();
    }
}
