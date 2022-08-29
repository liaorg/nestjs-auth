import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, ObjectId } from "mongoose";
import { BaseToken } from "./base-token.schema";

// 连接表名
@Schema({ collection: "user_refresh_tokens" })
class RefreshToken extends BaseToken {
    /**
     * 关联的登录令牌
     */
    @Prop({ required: true })
    accessToken: [{ type: ObjectId; ref: "AccessToken" }];
}

type RefreshTokenDocument = RefreshToken & Document;
const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);
export { RefreshTokenDocument, RefreshToken, RefreshTokenSchema };
