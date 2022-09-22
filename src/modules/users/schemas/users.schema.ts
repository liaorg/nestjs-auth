import { BaseDocument } from "@/common/schemas";
import { RoleType } from "@/modules/role-types/enums";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { randomBytes, scryptSync } from "crypto";
import { UserProfile } from "../interfaces/user-profile.interface";

// required: 布尔值或函数 如果值为真，为此属性添加 required 验证器
// default: 任何值或函数 设置此路径默认值。如果是函数，函数返回值为默认值
// select: 布尔值 指定 query 的默认 projections，查询结果是否显示该字段
// validate: 函数 adds a validator function for this property
// get: 函数 使用 Object.defineProperty() 定义自定义 getter
// set: 函数 使用 Object.defineProperty() 定义自定义 setter
// alias: 字符串 仅mongoose >= 4.10.0。 为该字段路径定义虚拟值 gets/sets

// index: 布尔值 是否对这个属性创建索引
// unique: 布尔值 是否对这个属性创建唯一索引
// sparse: 布尔值 是否对这个属性创建稀疏索引

// 连接表名
@Schema({ collection: "users" })
class Users extends BaseDocument {
    // 用户名
    @Prop({ type: String, required: true, trim: true, unique: true })
    username: string;

    // 用户密码
    @Prop({ type: String, required: true, trim: true })
    password: string;

    // 密码盐值
    @Prop({ type: String, required: true, trim: true })
    passwordSalt: string;

    // 用户所属角色 systemAdmin|securityAdmin|auditAdmin 对应的 ObjectId
    @Prop({ type: String, required: true, trim: true })
    role: string;

    // 角色名
    @Prop({ type: String, required: true, trim: true })
    rolename: string;

    // 角色类型 enum:RoleType {systemAdmin = 1,securityAdmin = 2,auditAdmin = 3,}
    @Prop({ type: Number, trim: true })
    roleType: RoleType;

    // 用户所属路由, 对应 Controller 中定义的请求方法
    // 不能超过所性角色的路由范围
    @Prop({ type: [String], required: true })
    routePath: string[];

    // 用户状态：0-失效|1-有效
    @Prop({ type: Number, trim: true, default: 0 })
    status: number;

    // 锁定状态：0-未锁定|1-锁定
    @Prop({ type: Number, trim: true, default: 0 })
    lockStatus: number;

    // 是否默认管理员：0-否|1-是
    @Prop({ type: Number, trim: true, default: 0 })
    isDefaultAdminer: number;

    // 锁定时间
    @Prop({ type: Number })
    lockedDate: number;

    // 用户元数据
    @Prop({ type: UserProfile })
    meta: UserProfile;
}

type UsersDocument = Users & BaseDocument;

const UsersSchema = SchemaFactory.createForClass(Users);

// 前置操作
UsersSchema.pre("validate", function (next) {
    // 盐值
    const salt = randomBytes(16).toString("hex");
    // 加密密码
    const newPasswd = scryptSync(this.password, salt, 64).toString("hex");
    this.passwordSalt = salt;
    this.password = newPasswd;
    next();
});

export { UsersDocument, Users, UsersSchema };
