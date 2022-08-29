// import { ObjectId } from "mongoose";
import { BaseTokenDto } from "./base-token.dto";
import { RefreshTokenDto } from "./refresh-token.dto";
import { RequestUserDto } from "./request-user.dto";

export class AccessTokenDto extends BaseTokenDto {
    /**
     * 所属用户
     */
    user?: RequestUserDto;
    /**
     * 关联的刷新令牌
     */
    // refreshToken?: ObjectId;
    refreshToken?: RefreshTokenDto;
}
