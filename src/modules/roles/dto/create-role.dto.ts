import { RequestValidationSchema } from "@/common/decorators";
import { createRoleValidationSchema } from "../schemas";

@RequestValidationSchema(createRoleValidationSchema)
export class CreateRoleDto {
    /**
     * 角色名
     * @example systemAdminTest
     */
    readonly rolename: string;

    /**
     * 父角色
     * @example systemAdmin
     */
    parentRole: string;

    /**
     * 角色路由菜单权限
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
