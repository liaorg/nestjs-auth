import { BaseDocument } from "@/common/schemas";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { RoleType } from "../enums";

export type RoleTypesDocument = RoleTypes & BaseDocument;

// 出厂固定为：三种角色 enum:RoleType {systemAdmin = 1,securityAdmin = 2,auditAdmin = 3,}
// 定义角色类型表 role_types

/**
 * @class RoleTypes 角色类型
 * @param roleType 角色类型
 * @param name 角色类型名
 * @param routes 角色类型的基本路由
 * @param status 状态：0-失效|1-有效
 */
@Schema({ collection: "role_types" })
export class RoleTypes extends BaseDocument {
    /**
     * 角色类型名
     */
    // 角色类型 enum:RoleType {systemAdmin = 1,securityAdmin = 2,auditAdmin = 3,}
    @Prop({ type: Number, trim: true, unique: true })
    roleType: RoleType;

    // 角色类型名
    @Prop({ type: String, required: true, trim: true })
    name: string;

    // 角色类型的基本路由
    @Prop({ type: Array, index: true })
    routes: object[];

    // 状态：0-失效|1-有效
    @Prop({ type: Number, default: 1 })
    status: number;

    // 是否 API 角色，api角色不显示在页面
    @Prop({ type: Boolean, default: false })
    isApi: boolean;
}
export const RoleTypesSchema = SchemaFactory.createForClass(RoleTypes);
