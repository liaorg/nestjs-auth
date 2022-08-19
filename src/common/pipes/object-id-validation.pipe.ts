import { PipeTransform, Injectable, ArgumentMetadata } from "@nestjs/common";
import { isValidObjectId } from "mongoose";
import { I18nValidationException } from "nestjs-i18n";

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
