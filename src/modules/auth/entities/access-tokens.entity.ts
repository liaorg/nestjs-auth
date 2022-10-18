import { UsersEntity } from "@/modules/users/entities";
import { Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { BaseTokenEntity } from "./base-token.entity";
import { RefreshTokensEntity } from "./refresh-tokens.entity";

// 用户认证token模型
@Entity("access_tokens")
export class AccessTokensEntity extends BaseTokenEntity {
    /**
     * 所属用户
     */
    @ManyToOne(() => UsersEntity, (user) => user.accessTokens, {
        onDelete: "CASCADE",
    })
    // 定义连接字段名
    @JoinColumn({ name: "userid" })
    user!: UsersEntity;
    /**
     * 关联的刷新令牌
     *
     * @type {RefreshTokensEntity}
     * @memberof AccessTokensEntity
     */
    @OneToOne(() => RefreshTokensEntity, (refreshToken) => refreshToken.accessToken, {
        cascade: true,
    })
    refreshToken!: RefreshTokensEntity;
}
