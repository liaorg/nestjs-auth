import { Exclude } from "class-transformer";
import { ObjectId } from "mongoose";

export class UserDto {
    _id: ObjectId;
    username: string;
    realName: string;
    @Exclude()
    password: string;
    @Exclude()
    passwordSalt: string;
    mobile: number;
    role: number;
    userStatus: number;

    createdAt?: string;
    updateAt?: string;

    createdDate?: number;
    updateDate?: number;
}
