import { RequestValidationSchema } from "@/common/decorators";
import { createRoleValidationSchema } from "../schemas";

@RequestValidationSchema(createRoleValidationSchema)
export class CreateRoleDto {
    /**
     * 角色名
     * @example systemAdminTest
     */
    readonly name: string;

    /**
     * 角色类型id
     * @example systemAdmin
     */
    roleGoupId: number;

    /**
     * 角色菜单路由权限
     * @example []
     */
    route?: string[];

    /**
     * 角色业务权限
     * @example []
     */
    business?: string[];

    /**
     * 角色描述
     * @example admin
     */
    description?: string;
}
