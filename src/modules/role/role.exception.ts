import { ApiException } from "@/common/exceptions";
import { ApiErrorObjectInterface } from "@/common/interfaces";

export class RoleException extends ApiException {
    constructor(objectOrError?: ApiErrorObjectInterface) {
        super(objectOrError);
    }
}
