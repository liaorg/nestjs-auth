// 请求输入输出规范
// 请求参数验证基于 ajv [https://github.com/ajv-validator/ajv]

export const loginValidationSchema = {
    type: "object",
    properties: {
        username: {
            type: "string",
            minLength: 3,
            maxLength: 10,
            errorMessage: {
                type: "must be a string",
                minLength: "user.error.length_username",
                maxLength: "maxLength",
            },
        },
        password: { type: "string" },
    },
    required: ["username", "password"],
    errorMessage: {
        required: {
            username: "user.error.required_username",
            password: "user.error.required_password",
        },
    },
};
