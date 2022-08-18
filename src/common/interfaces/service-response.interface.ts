export interface ServiceResponseData {
    // 状态码
    statusCode?: number;
    // 错误码
    // 0成功 有值失败
    errorCode?: number;
    // 成功或错误信息
    errorMessage?: string;
    // 返回数据
    data?: string | object;
}
