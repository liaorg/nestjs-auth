import { Column, Entity } from "typeorm";
import { BaseTokenEntity } from "./base-token.entity";

// 刷新Token的Token模型
@Entity("refresh_token")
export class RefreshTokenEntity extends BaseTokenEntity {
    @Column({ type: "varchar", name: "access_token_id" })
    accessTokenId: string;
}
