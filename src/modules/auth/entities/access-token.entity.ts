import { Column, Entity } from "typeorm";
import { BaseTokenEntity } from "./base-token.entity";

// 用户认证token模型
@Entity("access_token")
export class AccessTokenEntity extends BaseTokenEntity {
    @Column({ type: "integer", name: "user_id" })
    userId: number;
}
