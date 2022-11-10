import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// 连接表名
@Entity("role_permission_relation")
export class RolePermissionRelationEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "integer", name: "role_id" })
    roleId: number;
    @Column({ type: "integer", name: "permission_id" })
    permissionId: number;
}
