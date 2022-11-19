// 请求输入输出规范
// 请求参数验证基于 ajv [https://github.com/ajv-validator/ajv]

export const updatePasswordSchema = {
    type: "object",
    required: ["password", "repassword", "oldPassword"],
    properties: {
        password: { type: "string" },
        repassword: { type: "string" },
        oldPassword: { type: "string" },
    },
    errorMessage: {
        properties: {
            password: "must be a string",
            repassword: "must be a string",
            oldPassword: "must be a string",
        },
        required: {
            password: "user.error.requiredPassword",
            repassword: "user.error.requiredRepassword",
            oldPassword: "user.error.requiredOldPassword",
        },
    },
};
