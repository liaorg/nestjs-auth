import { Entity, JoinColumn, OneToOne } from "typeorm";
import { AccessTokensEntity } from "./access-tokens.entity";
import { BaseTokenEntity } from "./base-token.entity";

// 刷新Token的Token模型
@Entity("refresh_tokens")
export class RefreshTokensEntity extends BaseTokenEntity {
    /**
     * 关联的登录令牌
     *
     * @type {AccessTokensEntity}
     * @memberof RefreshTokensEntity
     */
    // @Column({ type: "integer", name: "access_token_id" })
    // accessTokenId: number;
    @OneToOne(() => AccessTokensEntity, (accessToken) => accessToken.refreshToken, {
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: "access_token_id" })
    accessToken!: AccessTokensEntity;
}
