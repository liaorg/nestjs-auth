import { CommonEntity } from "@/common/entities";
import { RolesEntity } from "@/modules/roles/entities";
import { Column, Entity, OneToMany } from "typeorm";

// 出厂固定为：三种角色 enum:RoleType {systemAdmin = 1,securityAdmin = 2,auditAdmin = 3,}
// 定义角色类型表 role_types
/**
 * @class RoleTypes 角色类型
 * @param type 角色类型
 * @param name 角色类型名
 */

// 连接表名
@Entity("role_types")
export class RoleTypesEntity extends CommonEntity {
    /**
     * 角色类
     */
    @Column({ unique: true })
    type: number;
    /**
     * 角色类型名
     */
    @Column({ unique: true })
    name: string;

    /**
     * 角色类型下的角色
     *
     * @type {RolesEntity[]}
     */
    @OneToMany(() => RolesEntity, (role) => role.roleType, {
        cascade: true,
    })
    roles: RolesEntity[];
}
