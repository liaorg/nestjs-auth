import { HttpException, HttpStatus } from "@nestjs/common";
import { ApiErrorObjectInterface } from "../interfaces";

// 业务接口异常应该继承该类，并在 api-error-code.const.ts 中定义自己的 error
export class ApiException extends HttpException {
    private readonly errors: ApiErrorObjectInterface | null;
    constructor(objectOrError?: ApiErrorObjectInterface | null) {
        const statusCode = objectOrError?.statusCode ?? HttpStatus.BAD_REQUEST;
        super(objectOrError, statusCode);
        this.errors = objectOrError;
    }

    public getErrors(): ApiErrorObjectInterface | null {
        return this.errors;
    }
}
