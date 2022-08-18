import { ServiceResponseData } from "@/common/interfaces";

export class UserDto {
    username: string;
    realName: string;
    // password: string;
    // passwordSalt: string;
    mobile: string;
    role: string;
    userStatus: string;
    createdDate: Date;
    updateDate: Date;

    constructor(partial: Partial<UserDto> | ServiceResponseData) {
        console.log("partial", this, partial);
        Object.assign(this, partial);
        console.log("partial222", this, partial);
    }
}
