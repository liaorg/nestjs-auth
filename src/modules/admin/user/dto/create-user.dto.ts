// 请求输入输出规范

import { RequestValidationSchema } from "@/common/decorators";
import { createUserSchema } from "../schemas";

// 注入验证 schema 对象
@RequestValidationSchema(createUserSchema)
export class CreateUserDto {
    /**
     * 用户名
     * @example xciovpmn
     */
    name: string;

    /**
     * 密码
     * @example md5(md5(xciovpmn))
     */
    password: string;

    /**
     * 确认密码
     * @example md5(md5(xciovpmn))
     */
    repassword: string;

    /**
     * 用户角色
     * @example 1
     */
    roleId: number;

    /**
     * 用户状态
     * @example 1
     */
    status: number;

    /**
     * 描述
     * @example test
     */
    description?: string;

    /**
     * 电子邮件
     * @example test@test.com
     */
    email?: string;
    /**
     * 真实姓名
     * @example 侯桂英
     */
    fullName?: string;
    /**
     * 性别：0-未知|1-男|2-女
     * @example 男
     */
    gender?: number;
    /**
     * 部门
     * @example 研发
     */
    department?: string;
    /**
     * 职务
     * @example 项目经理
     */
    duty?: string;
    /**
     * 身份证号
     * @example 350100271890123
     */
    idNumber?: string;
    /**
     * 手机号
     * @example 18627467753
     */
    phoneNumber?: number;
    /**
     * QQ
     * @example 1234567
     */
    qq?: number;
}
