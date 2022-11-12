import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// 连接表名
@Entity("admin_api_operate_permission_relation")
export class AdminApiOperatePermissionRelationEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "integer", name: "admin_api_id" })
    adminApiId: number;
    @Column({ type: "integer", name: "operate_id" })
    operateId: number;
    @Column({ type: "integer", name: "permission_id" })
    permissionId: number;
}
