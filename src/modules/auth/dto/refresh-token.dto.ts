import { User } from "@/modules/users/schemas";
import { ObjectId } from "mongoose";
import { BaseTokenDto } from "./base-token.dto";

export class RefreshTokenDto extends BaseTokenDto {
    /**
     * 所属用户
     */
    user?: User;
    /**
     * 关联的登录令牌
     */
    accessToken?: ObjectId;
}
