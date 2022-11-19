// 请求输入输出规范
// 请求参数验证基于 ajv [https://github.com/ajv-validator/ajv]

export const updateProfileSchema = {
    type: "object",
    properties: {
        name: {
            type: "string",
            title: "user.title",
            minLength: 3,
            maxLength: 10,
            errorMessage: {
                type: "must be a string",
                minLength: "user.error.lengthName",
                maxLength: "maxLength",
            },
        },
        password: { type: "string" },
        repassword: {
            type: "string",
            // format: "email",
            // errorMessage: {
            //     format: "must email",
            // },
        },
        fullName: { type: "string" },
        phoneNumber: { type: "number" },
    },
    errorMessage: {
        properties: {},
    },
};
