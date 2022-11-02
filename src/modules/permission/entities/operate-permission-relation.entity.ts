import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// 连接表名
@Entity("operate_permission_relation")
export class OperatePermissionRelationEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "integer", name: "operate_id" })
    operateId: number;
    @Column({ type: "integer", name: "permission_id" })
    permissionId: number;
}
