import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// 连接表名
@Entity("role_group_permission_relation")
export class RoleGroupPermissionRelationEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "integer", name: "role_group_id" })
    roleGroupId: number;
    @Column({ type: "integer", name: "permission_id" })
    permissionId: number;
}
