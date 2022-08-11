// api 错误枚举对象
export enum ApiErrorCode {
    TIMEOUT = -1, // 请求超时
    SUCCESS = 0, // 请求成功
    BAD_PARAMS = 400000, // 请求参数错误
}

// 用户管理
export enum UsersErrorCode {
    EXISTED_USERNAME = 400001, // 用户名已经存在
    ERROR_USERID = 400002, // 错误的用户id
    NOT_EXISTED_USERID = 400003, // 用户不存在
}
