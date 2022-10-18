import { getUTCTime } from "@/common/utils";
import { BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm";

export abstract class BaseTokenEntity extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    /**
     * 令牌字符串
     */
    @Column({ type: "varchar", length: 500 })
    value: string;
    /**
     * 令牌过期时间
     */
    @Column({ type: "integer", name: "expired_at" })
    expiredAt: number;
    // 创建时间
    @Column({ type: "integer", name: "create_date", default: () => getUTCTime().unix() })
    createDate: number;
    // 修改时间
    @Column({ type: "integer", name: "update_date", default: () => getUTCTime().unix() })
    updateDate: number;
}
