import { CommonEntity } from "@/common/entities";
import { RoleTypesEntity } from "@/modules/role-types/entities";
import { UsersEntity } from "@/modules/users/entities";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";

/**
 * @class Roles 角色
 * @param type 角色类型
 * @param name 角色类型名
 */

// 连接表名
@Entity("roles")
export class RolesEntity extends CommonEntity {
    // 角色类型id
    // @Column({ type: "integer", name: "role_type_id", unique: true })
    // roleTypeId: number;

    // 角色所属角色类型
    @ManyToOne(() => RoleTypesEntity, (roleType) => roleType.roles, {
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: "role_type_id" })
    roleType!: RoleTypesEntity;

    // 角色名
    @Column({ type: "varchar", unique: true })
    rolename: string;

    // 是否默认角色员：0-否|1-是，默认角色的权限(菜单和业务)不能修改
    @Column({ type: "boolean", name: "is_default", default: false })
    isDefault: boolean;

    // 状态：0-失效|1-有效|2-不可编辑
    @Column({ type: "tinyint", default: 0 })
    status: number;

    /**
     * 角色的用户
     *
     * @type {UsersEntity[]}
     */
    @OneToMany(() => UsersEntity, (user) => user.role, {
        cascade: true,
    })
    users: UsersEntity[];
}
