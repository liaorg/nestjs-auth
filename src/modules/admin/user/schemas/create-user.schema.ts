// 请求输入输出规范
// 请求参数验证基于 ajv [https://github.com/ajv-validator/ajv]

export const createUserSchema = {
    type: "object",
    required: ["name", "password", "repassword", "roleId", "status"],
    properties: {
        name: {
            type: "string",
            title: "users.title",
            default: "Liu.Jun",
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
        properties: {
            phoneNumber: "must be a number",
            role: "must be a number",
            status: "must be a number",
        },
        required: {
            name: "user.error.requiredName",
            password: "user.error.requiredPassword",
            repassword: "user.error.requiredRepassword",
            roleId: "user.error.requiredRoleId",
            status: "user.error.requiredStatus",
        },
    },
};
