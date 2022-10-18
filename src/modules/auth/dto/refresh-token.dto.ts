import { BaseTokenDto } from "./base-token.dto";

export class RefreshTokenDto extends BaseTokenDto {
    /**
     * 关联的登录令牌
     */
    accessTokenId?: number;
}
