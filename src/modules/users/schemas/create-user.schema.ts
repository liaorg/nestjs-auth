// 请求输入输出规范
// 请求参数验证基于 ajv [https://github.com/ajv-validator/ajv]

export const createUserSchema = {
    type: "object",
    properties: {
        username: {
            type: "string",
            minLength: 3,
            maxLength: 10,
            errorMessage: {
                type: "must be a string",
                minLength: "users.error.length_username",
                maxLength: "maxLength",
            },
        },
        realName: { type: "string" },
        password: { type: "string" },
        repassword: {
            type: "string",
            // format: "email",
            // errorMessage: {
            //     format: "must email",
            // },
        },
        mobile: { type: "number" },
        role: { type: "number" },
        userStatus: { type: "number" },
    },
    required: ["username", "password", "repassword"],
    errorMessage: {
        properties: {
            mobile: "must be a number",
            role: "must be a number",
            userStatus: "must be a number",
        },
        required: {
            username: "users.error.required_username",
            password: "users.error.required_password",
            repassword: "users.error.required_repassword",
        },
    },
};