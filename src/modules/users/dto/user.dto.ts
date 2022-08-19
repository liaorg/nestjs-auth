import { Exclude } from "class-transformer";

export class UserDto {
    username: string;
    realName: string;
    @Exclude()
    password: string;
    @Exclude()
    passwordSalt: string;
    mobile: string;
    role: string;
    userStatus: string;
    createdDate: Date;
    updateDate: Date;
}
