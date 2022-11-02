import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// 连接表名
@Entity("admin_api")
export class AdminApiEntity {
    @PrimaryGeneratedColumn()
    id: number;

    // 接口URL路径
    @Column({ type: "varchar", unique: true })
    path: string;
    // 操作方法 *,GET,PUT,PATCH,POST
    @Column({ type: "varchar" })
    method: string;
}
