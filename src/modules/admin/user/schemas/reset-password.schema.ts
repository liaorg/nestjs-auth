// 请求输入输出规范
// 请求参数验证基于 ajv [https://github.com/ajv-validator/ajv]

export const resetPasswordSchema = {
    type: "object",
    required: ["id", "password", "repassword"],
    properties: {
        id: { type: "array" },
        password: { type: "string" },
        repassword: { type: "string" },
    },
    errorMessage: {
        properties: {
            id: "must be a array",
            password: "must be a string",
            repassword: "must be a string",
        },
        required: {
            id: "user.error.requiredId",
            password: "user.error.requiredPassword",
            repassword: "user.error.requiredRepassword",
        },
    },
};
