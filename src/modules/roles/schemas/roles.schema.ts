import { BaseDocument } from "@/common/schemas";
import { RoleType } from "@/modules/role-types/enums";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

// 连接表名
@Schema({ collection: "roles" })
export class Roles extends BaseDocument {
    // 角色名
    @Prop({ type: String, required: true, trim: true, unique: true })
    rolename: string;

    // 是否默认角色员：0-否|1-是，默认角色的权限(菜单和业务)不能修改
    @Prop({ type: Boolean, default: false })
    isDefaultRole: boolean;

    // 默认管理员
    @Prop({ type: String, trim: true })
    defaultAdminer: string;

    // 角色类型 enum:RoleType {systemAdmin = 1,securityAdmin = 2,auditAdmin = 3,}
    @Prop({ type: Number, trim: true, index: true })
    roleType: RoleType;

    // 角色所属路由, 对应 Controller 中定义的请求方法
    @Prop({ type: [String], required: true })
    routePath: string[];

    // 角色业务权限 - 业务系统  TODO 连接业务系统表
    @Prop({ type: Array, trim: true })
    // business: [{ type: ObjectId; refPath: "Business" }];
    business: string[];

    // 状态：0-失效|1-有效|2-不可编辑
    @Prop({ type: Number, trim: true, default: 0 })
    status: number;
}

export type RolesDocument = Roles & BaseDocument;

export const RolesSchema = SchemaFactory.createForClass(Roles);
