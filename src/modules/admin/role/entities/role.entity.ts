import { CommonEntity } from "@/common/entities";
import { Column, Entity } from "typeorm";

/**
 * @class Role 角色
 * @param type 角色类型
 * @param name 角色类型名
 */

// 连接表名
@Entity("role")
export class RoleEntity extends CommonEntity {
    // 角色类型id
    // @Column({ type: "integer", name: "role_type_id", unique: true })
    // roleTypeId: number;

    // 角色所属角色类型
    // @ManyToOne(() => RoleGroupEntity, (roleType) => roleType.roles, {
    //     onDelete: "CASCADE",
    // })
    // @JoinColumn({ name: "role_type_id" })
    // roleGroup: RoleGroupEntity;

    // 角色名
    @Column({ type: "varchar", unique: true })
    name: string;

    // 是否默认角色员：0-否|1-是，默认角色的权限(菜单和业务)不能修改
    @Column({ type: "boolean", name: "is_default", default: false })
    isDefault: boolean;

    // 状态：0-失效|1-有效|2-不可编辑
    @Column({ type: "tinyint", default: 0 })
    status: number;

    /**
     * 本地化/国际化名称，对应 i18n 文件 role.json 中的字段
     */
    @Column()
    locale: string;
}
