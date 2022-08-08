// api 错误枚举对象
export enum ApiErrorCode {
    TIMEOUT = -1, // 请求超时
    SUCCESS = 0, // 请求成功
}

// 用户管理
export enum UsersErrorCode {
    NONE_REQUEST = 400001, // 不存在这个接口
    ERROR_USERID = 400002, // 错误的用户id
}
