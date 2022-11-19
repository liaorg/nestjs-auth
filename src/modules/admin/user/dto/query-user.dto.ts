/**
 * 请求输入输出规范
 */

import { RequestValidationSchema } from "@/common/decorators";
import { PaginationDto } from "@/common/dto";
import { queryUserSchema } from "../schemas";

/**
 * 注入验证 schema 对象
 */
@RequestValidationSchema(queryUserSchema)
export class QueryUserDto extends PaginationDto {
    /**
     * 用户名
     */
    name?: string;
    /**
     * 角色id
     */
    roleId?: number;
    /**
     * 状态
     */
    status?: number;
}
