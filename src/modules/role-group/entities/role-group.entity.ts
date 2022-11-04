import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// 出厂固定为：三种角色 enum:RoleType {systemAdmin = 1,securityAdmin = 2,auditAdmin = 3,}
// 定义角色组表 role_group
/**
 * @class RoleGroupEntity 角色组
 * @param type 角色类型
 * @param name 角色类型名
 */

// 连接表名
@Entity("role_group")
export class RoleGroupEntity {
    @PrimaryGeneratedColumn()
    id: number;
    /**
     * 角色类
     */
    @Column({ unique: true })
    type: number;
    /**
     * 角色组名
     */
    @Column({ unique: true })
    name: string;
    /**
     * 本地化/国际化名称，对应 i18n 文件 roleGroup.json 中的字段
     */
    @Column()
    locale: string;
    // /**
    //  * 角色组下的角色
    //  *
    //  * @type {RoleEntity[]}
    //  */
    // @OneToMany(() => RoleEntity, (role) => role.roleGroup, {
    //     cascade: true,
    // })
    // roles: RoleEntity[];
}
