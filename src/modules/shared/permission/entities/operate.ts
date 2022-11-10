import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// 连接表名
@Entity("operate")
export class OperateEntity {
    @PrimaryGeneratedColumn()
    id: number;

    // 操作方法 *,GET,HEAD,PUT,PATCH,POST,DELETE
    @Column({ type: "varchar" })
    method: string;
}
