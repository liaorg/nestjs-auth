// 客户端错误 400000+
// 服务端错误 500000+
// api 错误 400000 - 400999
// errorCode：错误码 langKeyword：多语言关键字，对应i18n中的字段
export const ApiError = {
    requestTimeout: { errorCode: -1, langKeyword: "api.error.requestTimeout" },
    requestSuccess: { errorCode: 0, langKeyword: "api.error.requestSuccess" },
    unknowError: { errorCode: 400000, langKeyword: "api.error.unknowError" },
    badParams: { errorCode: 400001, langKeyword: "api.error.badParams" },
    serverError: { errorCode: 500001, langKeyword: "api.error.serverError" },
};

// 登录验证 权限验证 400001+
export const AuthError = {
    wrongUserOrPassword: { errorCode: 400101, langKeyword: "auth.error.wrongUserOrPassword" },
    unauthorized: { errorCode: 400102, langKeyword: "auth.error.unauthorized" },
    forbidden: { errorCode: 400103, langKeyword: "auth.error.forbidden" },
    logoutFailed: { errorCode: 500101, langKeyword: "auth.error.logoutFailed" },
};

// 用户管理 401001+
export const UserError = {
    existedName: { errorCode: 401001, langKeyword: "user.error.existedName" },
    errorid: { errorCode: 401002, langKeyword: "user.error.errorid" },
    notExisted: { errorCode: 401003, langKeyword: "user.error.notExisted" },
    addFailed: { errorCode: 401004, langKeyword: "user.error.addFailed" },
    updateFailed: { errorCode: 401005, langKeyword: "user.error.updateFailed" },
    deleteFailed: { errorCode: 401006, langKeyword: "user.error.deleteFailed" },
    unDeleteDefault: { errorCode: 401007, langKeyword: "user.error.unDeleteDefault" },
    resetPasswordFailed: { errorCode: 401008, langKeyword: "user.error.resetPasswordFailed" },
    updatePasswordFailed: { errorCode: 401009, langKeyword: "user.error.updatePasswordFailed" },
    unContainLoginUser: { errorCode: 401010, langKeyword: "user.error.unContainLoginUser" },
};

// 角色管理 401101+
export const RoleError = {
    existedName: { errorCode: 401101, langKeyword: "role.error.existedName" },
    errorid: { errorCode: 401102, langKeyword: "role.error.errorid" },
    notExisted: { errorCode: 401103, langKeyword: "role.error.notExisted" },
};
