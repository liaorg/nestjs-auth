// 请求输入输出规范

import { RequestValidationSchema } from "@/common/decorators";
import { resetPasswordSchema } from "../schemas";

// 注入验证 schema 对象
@RequestValidationSchema(resetPasswordSchema)
export class ResetPasswordDto {
    /**
     * 用户id
     * @example [100,101]
     */
    id: number[];
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
