import { getUTCTime } from "@/common/utils";
import { Prop } from "@nestjs/mongoose";
import { Document } from "mongoose";

export abstract class BaseToken extends Document {
    /**
     * 令牌字符串
     */
    @Prop({ required: true, trim: true, index: true })
    value: string;
    /**
     * 令牌创建时间
     */
    @Prop({ required: true })
    expiredAt: number;
    @Prop({
        default: () => getUTCTime().unix(),
    })
    createdDate: number;
}
