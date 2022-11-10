// 请求输入输出规范
// 请求参数验证基于 ajv [https://github.com/ajv-validator/ajv]

export const CreatePermissionSchema = {
    type: "object",
    required: ["type"],
    properties: {
        type: {
            type: "string",
            title: "permission.type",
            default: "menu",
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
            type: "permission.error.requiredType",
        },
    },
};
