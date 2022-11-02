// 请求输入输出规范
// 请求参数验证基于 ajv [https://github.com/ajv-validator/ajv]

export const createUserSchema = {
    type: "object",
    required: ["username", "password", "repassword"],
    properties: {
        username: {
            type: "string",
            title: "users.title",
            default: "Liu.Jun",
            minLength: 3,
            maxLength: 10,
            errorMessage: {
                type: "must be a string",
                minLength: "users.error.lengthName",
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
    errorMessage: {
        properties: {
            mobile: "must be a number",
            role: "must be a number",
            userStatus: "must be a number",
        },
        required: {
            username: "users.error.requiredName",
            password: "users.error.requiredPassword",
            repassword: "users.error.requiredRepassword",
        },
    },
};
