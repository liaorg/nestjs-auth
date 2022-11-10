import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// 连接表名
@Entity("permission")
export class PermissionEntity {
    @PrimaryGeneratedColumn()
    id: number;

    // 权限类型 menu admin_api element operate
    @Column({ type: "varchar" })
    type: string;
}
