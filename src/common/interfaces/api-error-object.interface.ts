export interface ApiErrorObjectInterface {
    // http 状态码
    statusCode?: number;
    // 业务错误码
    errorCode: number;
    // 业务错误信息，对应 i18n 语言文件的关键字
    langKeyword: string;
    // 要传递给 i18n.t 的参数
    args?: object;
    // 其他信息
    [propName: string]: any;
}
