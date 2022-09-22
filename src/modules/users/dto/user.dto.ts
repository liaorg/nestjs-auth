import { Exclude } from "class-transformer";
import { ObjectId } from "mongoose";

class UserProfile {
    // 真实姓名
    realName?: string;
    // 电子邮件
    email?: string;
    // 性别
    gender?: string;
    // 部门
    department?: string;
    // 职务
    duty?: string;
    // 身份证号
    IDNumber?: string;
    // 手机号
    mobile?: number;
    // QQ
    qq?: number;
}

export class UserDto {
    _id: ObjectId;
    username: string;
    @Exclude()
    password: string;
    @Exclude()
    passwordSalt: string;
    role: string;
    rolename: string;
    roleType: number;
    @Exclude()
    routePath: string[];
    status: number;
    lockStatus: number;
    isDefaultAdminer: number;
    description?: string;
    lockedDate?: number;

    meta?: UserProfile;

    createdDate?: number;
    updateDate?: number;
}
