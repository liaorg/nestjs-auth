import { BaseDocument } from "@/common/schemas";
import { Prop } from "@nestjs/mongoose";

export abstract class BaseToken extends BaseDocument {
    /**
     * 令牌字符串
     */
    @Prop({ type: String, required: true, trim: true, index: true })
    value: string;
    /**
     * 令牌创建时间
     */
    @Prop({ type: Number, required: true })
    expiredAt: number;
}
