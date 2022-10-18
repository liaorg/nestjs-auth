import { BaseTokenDto } from "./base-token.dto";

export class AccessTokenDto extends BaseTokenDto {
    /**
     * 所属用户
     */
    userid?: number;
    /**
     * 关联的刷新令牌
     */
    refreshTokenId?: number;
}
