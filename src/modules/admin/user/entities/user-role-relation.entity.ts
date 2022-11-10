import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// 用户表和角色表关联表 user_role_relation

// 连接表名
@Entity("user_role_relation")
export class UserRoleRelationEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ type: "integer", name: "user_id" })
    userId: number;
    @Column({ type: "integer", name: "role_id" })
    roleId: number;
}
