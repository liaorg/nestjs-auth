// 客户端错误 400000+
// 服务端错误 500000+
// api 错误 400000 - 400999
// errorCode：错误码 langKeyword：多语言关键字，对应i18n中的字段
export const ApiError = {
    requestTimeout: { errorCode: -1, langKeyword: "api.error.requestTimeout" },
    requestSuccess: { errorCode: 0, langKeyword: "api.error.requestSuccess" },
    unknowError: { errorCode: 400000, langKeyword: "api.error.unknowError" },
    badParams: { errorCode: 400001, langKeyword: "api.error.badParams" },
};

// 登录验证 权限验证 400101+
export const AuthError = {
    wrongUserOrPassword: { errorCode: 400101, langKeyword: "auth.error.wrongUserOrPassword" },
    unauthorized: { errorCode: 400102, langKeyword: "auth.error.unauthorized" },
    forbidden: { errorCode: 400103, langKeyword: "auth.error.forbidden" },
    logoutFailed: { errorCode: 500101, langKeyword: "auth.error.logoutFailed" },
};

// 用户管理 401001+
export const UsersError = {
    existedName: { errorCode: 401001, langKeyword: "users.error.existedName" },
    errorid: { errorCode: 401002, langKeyword: "users.error.errorid" },
    notExisted: { errorCode: 401003, langKeyword: "users.error.notExisted" },
};

// 角色管理 401301+
export const RolesErros = {
    existedName: { errorCode: 401301, langKeyword: "roles.error.existedName" },
    errorid: { errorCode: 401302, langKeyword: "roles.error.errorid" },
    notExisted: { errorCode: 401303, langKeyword: "roles.error.notExisted" },
};
