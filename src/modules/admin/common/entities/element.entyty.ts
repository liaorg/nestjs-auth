import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// 连接表名
@Entity("element")
export class ElementEntity {
    @PrimaryGeneratedColumn()
    id: number;

    // 操作类型 元素id名
    @Column({ type: "varchar" })
    node: string;
}
