/**
 * 由JWT策略解析荷载后存入Rquest.user的对象
 *
 * @export
 * @class RequestUserDto
 */
export class RequestUserDto {
    /**
     * 登录用户id
     */
    id: number;
    /**
     * 登录名
     */
    name: string;
    /**
     * 角色id
     */
    roleId?: number;
    /**
     * 权限值
     */
    auth?: object[];
}
