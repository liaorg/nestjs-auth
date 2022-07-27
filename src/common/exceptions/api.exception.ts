import { HttpException, HttpStatus } from "@nestjs/common";
import { ApiErrorCode } from "../enums";

// 业务接口异常应该继承该类，并定义自己的枚举变量
export class ApiException extends HttpException {
    private static readonly defaultDesctiption = "Bad Request";
    // 业务错误码
    private readonly errorCode: number;
    // 业务错误信息
    private readonly errorMessage: string | object;
    constructor(objectOrError?: string | object | null, errorCode = 0, statusCode = HttpStatus.BAD_REQUEST) {
        super(objectOrError, statusCode);
        this.errorCode = errorCode;
        this.errorMessage = objectOrError || ApiException.defaultDesctiption;
    }

    public getErrorCode(): ApiErrorCode {
        return this.errorCode;
    }

    public getErrorMessage(): string | object {
        return this.errorMessage;
    }
}
