import { ApiException } from "@/common/exceptions";
import { UsersErrorCode } from "@/common/enums";

export class UsersException extends ApiException {
    constructor(objectOrError?: string | object | null, errorCode = UsersErrorCode.NONE_REQUEST) {
        super(objectOrError, errorCode);
    }
}
