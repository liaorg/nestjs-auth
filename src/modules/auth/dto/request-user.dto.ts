import { ObjectId } from "mongoose";

/**
 * 由JWT策略解析荷载后存入Rquest.user的对象
 *
 * @export
 * @class RequestUserDto
 */
export class RequestUserDto {
    _id: ObjectId;
    username: string;
    role: number;
}
