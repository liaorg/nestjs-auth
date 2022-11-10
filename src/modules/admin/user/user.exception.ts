import { ApiException } from "@/common/exceptions";
import { ApiErrorObjectInterface } from "@/common/interfaces";

export class UserException extends ApiException {
    constructor(objectOrError?: ApiErrorObjectInterface) {
        super(objectOrError);
    }
}
