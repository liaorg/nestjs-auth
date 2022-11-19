// 请求输入输出规范

import { RequestValidationSchema } from "@/common/decorators";
import { deleteUserSchema } from "../schemas";

// 注入验证 schema 对象
@RequestValidationSchema(deleteUserSchema)
export class DeleteUserDto {
    /**
     * 用户id
     * @example [100,101]
     */
    id: number[];
}

export class QueryParamDto {
    param: string;
}
