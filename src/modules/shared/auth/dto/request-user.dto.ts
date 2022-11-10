import { RoleGroupEnum } from "@/modules/admin/role-group/enums";

/**
 * 由JWT策略解析荷载后存入Rquest.user的对象
 *
 * @export
 * @class RequestUserDto
 */
export class RequestUserDto {
    id: number;
    username: string;
    role: number;
    roleGroup: RoleGroupEnum;
    routePath: string[];
}
