// 请求输入输出规范

import { RequestValidationSchema } from "@/common/decorators";
import { createUserSchema } from "../schemas";

class UserProfile {
    // 真实姓名
    realName?: string;
    // 电子邮件
    email?: string;
    // 性别
    gender?: string;
    // 部门
    department?: string;
    // 职务
    duty?: string;
    // 身份证号
    IDNumber?: string;
    // 手机号
    mobile?: number;
    // QQ
    qq?: number;
}

// 注入验证 schema 对象
@RequestValidationSchema(createUserSchema)
export class CreateUserDto {
    /**
     * 用户名
     * @example xciovpmn
     */
    readonly username: string;

    /**
     * 密码
     * @example xciovpmn
     */
    password: string;

    /**
     * 确认密码
     * @example xciovpmn
     */
    readonly repassword: string;

    /**
     * 用户角色
     * @example systemAdmin
     */
    // readonly role?: string;

    /**
     * 用户状态
     * @example 1
     */
    readonly status?: number;

    /**
     * 锁定状态
     * @example 1
     */
    readonly lockStatus?: number;

    /**
     * 是否管理员
     * @example 0
     */
    readonly isDefaultAdminer?: number;

    /**
     * 描述
     * @example test
     */
    description?: string;

    /**
     * 用户其他信息
     */
    meta?: UserProfile;

    // /**
    //  * 电子邮件
    //  * @example test@test.com
    //  */
    // email?: string;
    // /**
    //  * 用户姓名
    //  * @example 侯桂英
    //  */
    // realName?: string;
    // /**
    //  * 性别
    //  * @example 男
    //  */
    // gender?: string;
    // /**
    //  * 部门
    //  * @example 研发
    //  */
    // department?: string;
    // /**
    //  * 职务
    //  * @example 项目经理
    //  */
    // duty?: string;
    // /**
    //  * 身份证号
    //  * @example 350100271890123
    //  */
    // IDNumber?: string;
    // /**
    //  * 手机号
    //  * @example 18627467753
    //  */
    // mobile?: number;
    // /**
    //  * QQ
    //  * @example 1234567
    //  */
    // qq?: number;
}
