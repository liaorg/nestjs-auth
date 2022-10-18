export abstract class BaseTokenDto {
    id?: number;
    /**
     * 令牌字符串
     */
    value: string;
    /**
     * 令牌过期时间
     */
    expiredAt: number;
    /**
     * 令牌创建时间
     */
    createdDate?: number;
}
