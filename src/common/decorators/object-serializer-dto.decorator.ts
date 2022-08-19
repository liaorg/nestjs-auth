import { SetMetadata } from "@nestjs/common";
import { OBJECT_SERIALIZER_DTO } from "../constants";

/**
 * 自定义装饰器用于给拦截器： ObjectSerializerInterceptor 设置 dto 参数
 * 使用：
 * 在类或方法使用装饰器
 * @ObjectSerializerDtoDecorator(dto)
 */
export const ObjectSerializerDtoDecorator = (dto: object) => SetMetadata(OBJECT_SERIALIZER_DTO, dto);
