import { RequestValidationSchema } from "@/common/decorators";
import { loginValidationSchema } from "../schemas";

// 注入验证 schema 对象
@RequestValidationSchema(loginValidationSchema)
export class LoginDto {
    /**
     * 用户名
     * @example xciovpmn
     */
    readonly username: string;
    /**
     * 密码
     * @example kgwqzisvjrxm
     */
    readonly password: string;
}
