import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// 连接表名
@Entity("admin_route_permission_relation")
export class AdminRoutePermissionRelationEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "integer", name: "admin_route_id" })
    adminRouteId: number;
    @Column({ type: "integer", name: "permission_id" })
    permissionId: number;
}
