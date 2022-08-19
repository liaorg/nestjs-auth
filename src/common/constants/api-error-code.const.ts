// api 错误 400000 - 400999
export const ApiError = {
    timeout: { errorCode: -1, langKeyword: "api.error.request_timeout" },
    success: { errorCode: 0, langKeyword: "api.error.request_success" },
    unknowError: { errorCode: 400000, langKeyword: "api.error.unknow_error" },
    badParams: { errorCode: 400001, langKeyword: "api.error.bad_params" },
};

// 用户管理
export const UsersError = {
    existedName: { errorCode: 401001, langKeyword: "users.error.existed_username" },
    errorUserid: { errorCode: 401002, langKeyword: "users.error.error_userid" },
    notExistedUser: { errorCode: 401003, langKeyword: "users.error.not_existed_user" },
};
