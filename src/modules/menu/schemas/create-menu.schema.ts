// 请求输入输出规范
// 请求参数验证基于 ajv [https://github.com/ajv-validator/ajv]

export const CreateMenuSchema = {
    type: "object",
    required: ["type"],
    properties: {
        type: {
            type: "string",
            title: "menu.type",
            errorMessage: {
                type: "must be string",
            },
        },
    },
    errorMessage: {
        properties: {
            type: "must be string",
        },
        required: {
            type: "menu.error.requiredType",
        },
    },
};
