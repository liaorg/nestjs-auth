import { ApiException } from "@/common/exceptions";
import { ApiErrorObjectInterface } from "@/common/interfaces";

export class AuthException extends ApiException {
    constructor(objectOrError?: ApiErrorObjectInterface) {
        super(objectOrError);
    }
}
