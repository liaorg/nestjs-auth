import { RoleType } from "@/modules/role-types/enums";

/**
 * 由JWT策略解析荷载后存入Rquest.user的对象
 *
 * @export
 * @class RequestUserDto
 */
export class RequestUserDto {
    id: number;
    username: string;
    role: string;
    roleType: RoleType;
    routePath: string[];
}
