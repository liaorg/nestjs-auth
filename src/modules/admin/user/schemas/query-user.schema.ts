// 请求输入输出规范
// 请求参数验证基于 ajv [https://github.com/ajv-validator/ajv]

export const queryUserSchema = {
    type: "object",
    required: ["page", "limit"],
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
        roleId: { type: "number" },
        status: { type: "number" },
        page: { type: "number" },
        limit: { type: "number" },
    },
    errorMessage: {
        properties: {
            roleId: "must be a number",
            status: "must be a number",
            page: "must be a number",
            limit: "must be a number",
        },
        required: {
            page: "user.error.requiredPage",
            limit: "user.error.requiredLimit",
        },
    },
};
