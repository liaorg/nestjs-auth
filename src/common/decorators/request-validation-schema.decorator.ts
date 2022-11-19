import { SetMetadata } from "@nestjs/common";
import { SchemaObject } from "ajv";
import { REQUEST_SCHEMA_VALIDATION } from "../constants";

/**
 * 自定义装饰器用于给管道验证器： RequestValidationSchemaPipe 设置 schema 参数
 * 使用：
 * 在 dto 中使用装饰器
 * @RequestValidationSchema(schema)
 */
export const RequestValidationSchema = (schema: SchemaObject) =>
    SetMetadata(REQUEST_SCHEMA_VALIDATION, schema);
