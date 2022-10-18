import { CommonEntity } from "@/common/entities";
import { AccessTokensEntity } from "@/modules/auth/entities";
import { Column, Entity, OneToMany } from "typeorm";

/**
 * @class UsersEntity 用户
 */

// 连接表名
@Entity("users")
export class UsersEntity extends CommonEntity {
    // 所属角色id：用逗号分隔
    @Column({ type: "integer", name: "role_id" })
    roleId: number;

    // 用户名称
    @Column({ type: "varchar", unique: true })
    username: string;

    // 密码
    @Column({ type: "varchar" })
    password: string;

    // 密码盐值
    @Column({ type: "varchar", name: "password_salt" })
    passwordSalt: string;

    // 是否默认管理员：0-否|1-是
    @Column({ type: "boolean", name: "is_default", default: false })
    isDefault: boolean;

    // 状态：0-失效|1-有效|2-不可编辑
    @Column({ type: "tinyint", default: 1 })
    status: number;

    // email
    @Column({ type: "varchar" })
    email: string;

    // 真实姓名
    @Column({ type: "varchar", name: "full_name" })
    fullName: string;

    // 性别：0-未知|1-男|2-女
    @Column({ type: "tinyint" })
    gender: number;

    // 部门
    @Column({ type: "varchar" })
    department: string;

    // 职务
    @Column({ type: "varchar" })
    duty: string;

    // 身份证号
    @Column({ type: "varchar", name: "full_name" })
    idNumber: string;

    // 手机号
    @Column({ type: "integer", name: "phone_number" })
    phoneNumber: number;

    // QQ
    @Column({ type: "integer" })
    qq: number;

    /**
     * 用户的登录令牌
     *
     * @type {AccessTokensEntity[]}
     * @memberof UserEntity
     */
    @OneToMany((_type) => AccessTokensEntity, (accessToken) => accessToken.user, {
        cascade: true,
    })
    accessTokens: AccessTokensEntity[];
}
