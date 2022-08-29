import { getUTCTime } from "@/common/utils";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { randomBytes, scryptSync } from "crypto";
import { Document } from "mongoose";

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
class User extends Document {
    @Prop({ required: true, trim: true, unique: true })
    username: string;

    @Prop({ required: true, trim: true })
    password: string;

    @Prop({ required: true, trim: true })
    passwordSalt: string;

    @Prop({ trim: true })
    realName: string;

    @Prop({ trim: true })
    mobile: number;

    // 用户角色：0-超级管理员|1-管理员|2-开发&测试&运营|3-普通用户（只能查看）
    @Prop({ trim: true, default: 3 })
    role: number;

    // 状态：0-失效|1-有效|2-删除
    @Prop({ trim: true, default: 0 })
    userStatus: number;

    @Prop({ default: () => getUTCTime().unix() })
    createdDate: number;

    @Prop({ default: () => getUTCTime().unix() })
    updateDate: number;
}

type UserDocument = User & Document;

const UserSchema = SchemaFactory.createForClass(User);

// 前置操作
UserSchema.pre("validate", function (next) {
    // 盐值
    const salt = randomBytes(16).toString("hex");
    // 加密密码
    const newPasswd = scryptSync(this.password, salt, 64).toString("hex");
    this.passwordSalt = salt;
    this.password = newPasswd;
    next();
});

export { UserDocument, User, UserSchema };
