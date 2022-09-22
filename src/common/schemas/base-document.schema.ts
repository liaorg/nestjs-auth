import { getUTCTime } from "@/common/utils";
import { Prop } from "@nestjs/mongoose";
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

export abstract class BaseDocument extends Document {
    // 描述
    @Prop({ type: String, trim: true })
    description: string;

    // 创建时间
    @Prop({ type: Number, default: () => getUTCTime().unix() })
    createdDate: number;

    // 修改时间
    @Prop({ type: Number, default: () => getUTCTime().unix() })
    updateDate: number;
}
