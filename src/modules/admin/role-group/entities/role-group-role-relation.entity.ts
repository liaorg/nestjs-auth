import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// 角色组表和角色表关联关系表 role_group

// 连接表名
@Entity("role_group_role_relation")
export class RoleGroupRoleRelationEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ type: "integer", name: "role_group_id" })
    roleGroupId: number;
    @Column({ type: "integer", name: "role_id" })
    roleId: number;
}
