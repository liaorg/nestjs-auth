/**
 * 由JWT策略解析荷载后存入Rquest.user的对象
 *
 * @export
 * @class RequestUserDto
 */
export class RequestUserDto {
    id: number;
    name: string;
    roleId?: number;
    password?: string;
    passwordSalt?: string;
    auth?: object[];
}
