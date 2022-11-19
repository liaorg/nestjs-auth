// 请求输入输出规范
// 请求参数验证基于 ajv [https://github.com/ajv-validator/ajv]

export const deleteUserSchema = {
    type: "object",
    required: ["id"],
    properties: {
        id: {
            type: "array",
            errorMessage: {
                type: "must be an array",
            },
        },
    },
    errorMessage: {
        required: {
            id: "user.error.requiredId",
        },
    },
};
