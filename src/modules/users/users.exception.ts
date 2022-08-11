import { ApiException } from "@/common/exceptions";
import { ApiErrorCode } from "@/common/enums";

export class UsersException extends ApiException {
    constructor(objectOrError?: string | object | null, errorCode = ApiErrorCode.BAD_PARAMS) {
        super(objectOrError, errorCode);
    }
}
