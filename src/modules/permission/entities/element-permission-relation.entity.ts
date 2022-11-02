import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// 连接表名
@Entity("element_permission_relation")
export class ElementPermissionRelationEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "integer", name: "element_id" })
    elementId: number;
    @Column({ type: "integer", name: "permission_id" })
    permissionId: number;
}
