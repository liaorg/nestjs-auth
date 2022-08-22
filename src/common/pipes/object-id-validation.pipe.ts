import { PipeTransform, Injectable, ArgumentMetadata } from "@nestjs/common";
import { isValidObjectId } from "mongoose";
import { I18nValidationException } from "nestjs-i18n";

/**
 * 自定义管道，验证 mongodb 中的 ObjectId
 * 使用：
 * 在方法中使用装饰器，如：
 * findById(@Param("id", ObjectIdValidationPipe) id: ObjectId)
 *
 */

@Injectable()
export class ObjectIdValidationPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        if (!isValidObjectId(value)) {
            const errors = [
                {
                    property: metadata.data,
                    constraints: { type: "api.error.objectid" },
                },
            ];
            throw new I18nValidationException(errors);
        }
        return value;
    }
}
