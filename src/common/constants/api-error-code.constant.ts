// 客户端错误 400000+
// 服务端错误 500000+
// api 错误 400000 - 400999
export const ApiError = {
    timeout: { errorCode: -1, langKeyword: "api.error.request_timeout" },
    success: { errorCode: 0, langKeyword: "api.error.request_success" },
    unknowError: { errorCode: 400000, langKeyword: "api.error.unknow_error" },
    badParams: { errorCode: 400001, langKeyword: "api.error.bad_params" },
};

// 登录验证 权限验证 400101+
export const AuthError = {
    wrongUserOrPassword: { errorCode: 400101, langKeyword: "auth.error.wrong_user_password" },
    unauthorized: { errorCode: 400102, langKeyword: "auth.error.unauthorized" },
    forbidden: { errorCode: 400103, langKeyword: "auth.error.forbidden" },
    logoutFailed: { errorCode: 500101, langKeyword: "auth.error.logoutFailed" },
};

// 用户管理 401001+
export const UsersError = {
    existedName: { errorCode: 401001, langKeyword: "users.error.existed_username" },
    errorUserid: { errorCode: 401002, langKeyword: "users.error.error_userid" },
    notExistedUser: { errorCode: 401003, langKeyword: "users.error.not_existed_user" },
};
