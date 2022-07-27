import { ApiException } from "@/common/exceptions";
import { UsersErrorCode } from "./enums/users-error-code.enum";

export class UsersException extends ApiException {
    constructor(objectOrError?: string | object | null, errorCode = UsersErrorCode.NONE_REQUEST) {
        super(objectOrError, errorCode);
    }
}
