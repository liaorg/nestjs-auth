// 请求输入输出规范

import { RequestSchemaValidation } from "@/common/decorators";
import { createUserSchema } from "../schemas";

// 注入验证 schema 对象
@RequestSchemaValidation(createUserSchema)
export class CreateUserDto {
    /**
     * 用户名
     * @example xciovpmn
     */
    readonly username: string;

    /**
     * 用户姓名
     * @example 侯桂英
     */
    readonly realName?: string;

    /**
     * 密码
     * @example kgwqzisvjrxm
     */
    password: string;

    /**
     * 确认密码
     * @example kgwqzisvjrxm
     */
    readonly repassword: string;

    /**
     * 手机号
     * @example 18627467753
     */
    readonly mobile?: number;

    /**
     * 用户角色 0-超级管理员|1-管理员|2-开发&测试&运营|3-普通用户
     * @example 3
     */
    readonly role?: number;

    /**
     * 用户状态
     * @example 1
     */
    readonly userStatus?: number;
}
