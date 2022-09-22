import { PipeTransform, Injectable, ArgumentMetadata } from "@nestjs/common";
import { SchemaObject } from "ajv";
import { I18nValidationException } from "nestjs-i18n";
import { REQUEST_SCHEMA_VALIDATION } from "../constants";
import { validate } from "@/common/utils";

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

/**
 * 自定义管道，根据传递的 schema 结构验证请求参数
 * 使用：
 * 在 dto 中使用装饰器
 * @RequestValidationSchema(schema)
 *
 * 在类或方法使用装饰器
 * @UsePipes(RequestValidationSchemaPipe)
 * 在全局使用
 * // 全局 request 参数验证
 *        {
 *            provide: APP_PIPE,
 *            useClass: RequestValidationSchemaPipe,
 *        }
 */

@Injectable()
export class RequestValidationSchemaPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        const { metatype } = metadata;

        // 获取要验证的dto类
        const dto = metatype as any;
        // 获取 dto 类的装饰器元数据中的自定义验证选项
        const schema: SchemaObject = Reflect.getMetadata(REQUEST_SCHEMA_VALIDATION, dto) || {};
        // console.log("schema", dto, schema);
        // 验证请求参数
        const errors = validate(schema, value);
        if (errors.length) {
            // 抛出错误
            throw new I18nValidationException(errors);
        }
        return value;
    }
}
