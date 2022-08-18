import Ajv from "ajv";
import mongoose from "mongoose";
import ajvErrors from "ajv-errors";

// mongoose 的 ajv 插件
// https://ajv.js.org
// npm install ajv --save
// npm install ajv-errors --save

const ValidationError = mongoose.Error.ValidationError;
const ValidatorError = mongoose.Error.ValidatorError;

// 获取自身属性
const getOwnPropertys = function getOwnPropertys(obj) {
    const newObj = {};
    Object.entries(obj).forEach((value) => {
        newObj[value[0]] = value[1];
    });
    return newObj;
};

export function ajvPlugin(schema) {
    // GET THE AJV INSTANCE
    const ajv = new Ajv({ allErrors: true });
    ajvErrors(ajv);
    // COMPILE THE ATTRIBUTE SCHEMA
    const validateChild = {};
    let validate;
    // COMPILE THE OVERALL DOCUMENT SCHEMA
    if (schema.path("ajv-schema")) {
        try {
            const data = getOwnPropertys(schema.paths["ajv-schema"].options);
            validate = ajv.compile(data);
            schema.remove("ajv-schema");
        } catch (err) {
            throw new Error(`Failed to compile document schema with error message: ${err["message"]} `);
        }
    }
    schema.eachPath((key) => {
        if (!schema.path(key).options["ajv-schema"]) {
            return;
        }
        try {
            console.log(`creating schema for path: "${key}" ... `);
            const $schema = ajv.compile(getOwnPropertys(schema.path(key).options["ajv-schema"]));
            validateChild[key] = $schema;
        } catch (err) {
            throw new Error(`Failed to compile schema for path "${key}" with error message: ${err["message"]} `);
        }
    });

    // post 钩子先于 pre 钩子执行
    schema.post("validate", function (data, next) {
        console.log("validate-ajv", data);
        // APPLY THE OVERALL DOCUMENT SCHEMA
        if (validate && !validate(data)) {
            const error = new ValidationError(data);
            error.message += "; ";
            console.log("ajv validate.errors: ", validate.errors);
            error.message += JSON.stringify(validate.errors.map((x) => `'${x.schemaPath}' ${x.message}`));
            error.errors.record = new ValidatorError({
                path: "record",
                message: "Overall object does not match JSON-schema",
                type: "notvalid",
                value: data,
            });
            error.errors.record["errors"] = validate.errors;
            return next(error);
        }
        try {
            // APPLY THE ATTRIBUTE SCHEMA
            let $validate;
            for (const key in validateChild) {
                if (data[key] === undefined) {
                    // use the Mongoose `required` validator for validating the presence of the attribute
                    continue;
                }
                console.log("validating schema path", key);
                $validate = validateChild[key];
                if (!$validate(data[key])) {
                    const error = new ValidationError(data);
                    error.message += `; '${key}' attribute does not match it's JSON-schema: `;
                    error.message += JSON.stringify($validate.errors.map((x) => `'${x.schemaPath}' ${x.message}`));
                    error.errors[key] = new ValidatorError({
                        path: key,
                        message: key + " does not match JSON-schema",
                        type: "notvalid",
                        value: data,
                    });
                    error.errors[key]["errors"] = validateChild[key].errors;
                    return next(error);
                }
            }
            return next();
        } catch (err) {
            return next(err);
        }
    });
}
