export class TokenPayloadDto {
    /**
     * 唯一id
     */
    $id?: string;
    /**
     * 主题
     */
    sub?: string;
    /**
     * 创建时间
     */
    iat?: number;
    /**
     * 过期时间
     */
    exp?: number;
}
