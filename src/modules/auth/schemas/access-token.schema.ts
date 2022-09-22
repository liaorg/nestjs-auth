import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { RefreshTokenDto, RequestUserDto } from "../dto";
import { BaseToken } from "./base-token.schema";

// 连接表名
@Schema({ collection: "user_access_tokens" })
class AccessToken extends BaseToken {
    /**
     * 所属用户
     */
    @Prop({ type: Object, required: true })
    user: RequestUserDto;
    /**
     * 关联的刷新令牌
     * ref 选项告诉 Mongoose 在填充的时候使用哪个 model
     */
    // @Prop({ required: true })
    // refreshToken: [{ type: ObjectId; refPath: "RefreshToken" }];

    @Prop({ type: Object, required: true, trim: true })
    refreshToken: RefreshTokenDto;
}

type AccessTokenDocument = AccessToken & BaseToken;
const AccessTokenSchema = SchemaFactory.createForClass(AccessToken);
export { AccessTokenDocument, AccessToken, AccessTokenSchema };
