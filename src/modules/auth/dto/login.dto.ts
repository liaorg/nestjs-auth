import { RequestSchemaValidation } from "@/common/decorators";
import { loginSchema } from "../schemas";

// 注入验证 schema 对象
@RequestSchemaValidation(loginSchema)
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
