import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// 连接表名
@Entity("menu_permission_relation")
export class MenuPermissionRelationEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "integer", name: "menu_id" })
    menuId: number;
    @Column({ type: "integer", name: "permission_id" })
    permissionId: number;
}
