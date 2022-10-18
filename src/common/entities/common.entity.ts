import { getUTCTime } from "@/common/utils";
import { BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm";

// https://typeorm.io/entities
// sqlite
// Column
// Column options
// type length default primary unique

// 类型 type 有: int, int2, int8, integer, tinyint, smallint, mediumint, bigint, decimal, numeric,
// float, double, real, double precision, datetime, varying character, character, native character,
// varchar, nchar, nvarchar2, unsigned big int, boolean, blob, text, clob, date

export abstract class CommonEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    // 描述
    @Column({ type: "text" })
    description: string;

    // 创建时间
    @Column({ type: "integer", name: "create_date", default: () => getUTCTime().unix() })
    createDate: number;

    // 修改时间
    @Column({ type: "integer", name: "update_date", default: () => getUTCTime().unix() })
    updateDate: number;
}
