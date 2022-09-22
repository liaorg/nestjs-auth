export const createRoleValidationSchema = {
    type: "object",
    properties: {
        rolename: {
            type: "string",
            minLength: 3,
            maxLength: 10,
            errorMessage: {
                type: "must be a string",
                minLength: "roles.error.length_rolename",
                maxLength: "maxLength",
            },
        },
        description: { type: "string" },
        route: {
            type: "array",
            errorMessage: {
                type: "must be an array of string",
            },
        },
        business: {
            type: "array",
            errorMessage: {
                type: "must be an array of string",
            },
        },
    },
    required: ["rolename", "route"],
    errorMessage: {
        required: {
            rolename: "roles.error.required_rolename",
            route: "roles.error.required_route",
        },
    },
};
