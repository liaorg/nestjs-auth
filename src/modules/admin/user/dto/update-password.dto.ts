// 请求输入输出规范

import { RequestValidationSchema } from "@/common/decorators";
import { updatePasswordSchema } from "../schemas";

// 注入验证 schema 对象
@RequestValidationSchema(updatePasswordSchema)
export class UpdatePasswordDto {
    /**
     * 密码
     * @example md5(md5(xciovpmn))
     */
    oldPassword: string;
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
}
