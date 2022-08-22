import { PipeTransform, Injectable, ValidationError, ArgumentMetadata } from "@nestjs/common";
import Ajv, { SchemaObject } from "ajv";
import ajvErrors from "ajv-errors";
import addFormats from "ajv-formats";
import { I18nValidationException } from "nestjs-i18n";
import { REQUEST_SCHEMA_VALIDATION } from "../constants";

// 验证请求参数管道
// 使用 @Injectable() 装饰器注解的类
// 管道应该实现 PipeTransform 接口
// 每个管道必须实现一个 transform(value: any, metadata: ArgumentMetadata) 函数
// value 是当前处理的参数，而 metadata 是其元数据，包含一些属性：
// export interface ArgumentMetadata {
//   type: 'body' | 'query' | 'param' | 'custom';
//   metatype?: Type<unknown>;
//   data?: string;
// }

// npm install ajv-errors --save
// npm install ajv-formats --save

/**
 * 基于 ajv [https://github.com/ajv-validator/ajv] 的验证器
 * http://json-schema.org/
 * https://ajv.js.org/guide/managing-schemas.html#re-using-validation-functions
 * 在控制器中使用：
 * ```@UsePipes(new RequestValidationPipe(schema: SchemaObject))```
 *
 * SchemaObjece, 类似如下结构：
 * 参考：
 * ajv-errors repository[https://github.com/ajv-validator/ajv-errors]
 * ajv-formats[https://github.com/ajv-validator/ajv-formats]
 * ajv-keywords[https://github.com/ajv-validator/ajv-keywords]
 * ```
 * const schema = {
 *    type: "object",
 *    properties: {
 *        username: {
 *            type: "string",
 *            minLength: 3,
 *            maxLength: 10,
 *            errorMessage: {
 *                type: "must be a string",
 *                minLength: "users.errorCode.LENGTH_USERNAME",
 *                maxLength: "maxLength",
 *            },
 *        },
 *        realName: { type: "string" },
 *    },
 *    required: ["username", "realName"],
 *    errorMessage: {
 *        properties: {
 *            realName: "must be a string",
 *        },
 *        required: {
 *            username: "must required",
 *            realName: "must required",
 *        },
 *    },
 * };
 * ```
 */

/**
 * 自定义管道，根据传递的 schema 结构验证请求参数
 * 使用：
 * 在 dto 中使用装饰器
 * @RequestSchemaValidation(schema)
 *
 * 在类或方法使用装饰器
 * @UsePipes(RequestSchemaValidationPipe)
 * 在全局使用
 * // 全局 request 参数验证
 *        {
 *            provide: APP_PIPE,
 *            useClass: RequestSchemaValidationPipe,
 *        }
 */

const ajv = new Ajv({ allErrors: true });
// ajv 中间件，可自定义错误信息 errorMessage
ajvErrors(ajv);
// ajv 中间件，增加 string 中的 format
addFormats(ajv);

@Injectable()
export class RequestSchemaValidationPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        const { metatype } = metadata;

        // 获取要验证的dto类
        const dto = metatype as any;
        // 获取 dto 类的装饰器元数据中的自定义验证选项
        const schema: SchemaObject = Reflect.getMetadata(REQUEST_SCHEMA_VALIDATION, dto) || {};
        // console.log("schema", dto, schema);

        // 生成验证规则
        if (schema) {
            const validate = ajv.compile(schema);
            // 验证
            if (validate && !validate(value)) {
                // 验证不通过，转换错误
                // 遍历并转换消息
                const errors = this.mapErrors(validate.errors);
                // console.log("validate.errors", validate.errors, errors);
                // 抛出错误
                throw new I18nValidationException(errors);
            }
        }
        return value;
    }

    /**
     * 遍历并转换错误消息
     * 返回错误信息类似以下 errors：
     * [
     *   {
     *     instancePath: '',
     *     params: { errors: [{
     *         keyword: 'required',
     *         params: { missingProperty: 'realName' },
     *     }]},
     *     message: 'must required realName'
     *   },
     *   {
     *     instancePath: '/username',
     *     params: { errors: [{
     *        params: { type: 'number' },
     *     }]},
     *     message: 'must be a number'
     *   }
     * ]
     * 转换成 i18n 的错误形式 return：
     * [{
     *      property: 'realName',
     *      constraints: { required: 'must required realName' }
     *   },
     *   { property: 'username', constraints: { type: 'must a number' } }
     * ]
     * @param errors
     * @returns
     */
    private mapErrors(errors: any[]): ValidationError[] {
        return errors.map((value) => {
            let property = "";
            let constraints = {};
            // console.log("error", value);
            const error = value.params.errors?.length ? value.params.errors[0] : value;
            if (error.keyword === "required") {
                // 如果是 required类型，即 schema对象中在required: ["username", "realName"]中的限定
                property = value.params.errors[0].params.missingProperty;
                constraints = { required: value.message };
            } else if (error.keyword === "type") {
                // 是类型错误
                property = error.instancePath.substring(1);
                constraints[error.params.type] = value.message;
            } else if (error.keyword === "format") {
                // 是 format 类型错误
                property = error.instancePath.substring(1);
                constraints[error.params.format] = value.message;
            } else {
                // 其他的在 errorMessage: { }中的限定
                property = value.instancePath.substring(1);
                constraints[error.keyword] = value.message;
            }
            return { property, constraints };
        });
    }
}
