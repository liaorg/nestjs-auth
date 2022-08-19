import { ApiException } from "@/common/exceptions";
import { ApiErrorObjectInterface } from "@/common/interfaces";

export class UsersException extends ApiException {
    constructor(objectOrError?: ApiErrorObjectInterface) {
        super(objectOrError);
    }
}
