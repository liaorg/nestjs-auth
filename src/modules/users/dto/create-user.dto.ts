import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, Length } from "class-validator";
import { i18nValidationMessage } from "nestjs-i18n";

// 请求输入输出规范
// 请求参数验证 class-validator
// swagger 文档 ApiProperty ApiPropertyOptional
// 多语言 i18nValidationMessage
export class CreateUserDto {
    // swagger 映射
    @ApiProperty({ description: "用户名", example: "xciovpmn" })
    // 验证顺序为从下往上
    @Length(3, 10, { message: i18nValidationMessage("users.errorCode.LENGTH_USERNAME") })
    @IsNotEmpty({ message: i18nValidationMessage("users.errorCode.REQUIRED_USERNAME") })
    readonly username: string;

    @ApiProperty({ description: "用户姓名", example: "侯桂英" })
    readonly realName?: string;

    @ApiProperty({ description: "密码", example: "kgwqzisvjrxm" })
    @IsNotEmpty({ message: i18nValidationMessage("users.errorCode.REQUIRED_PASSWORD") })
    password: string;

    @ApiProperty({ description: "确认密码", example: "kgwqzisvjrxm" })
    // @Equals("password", { message: i18nValidationMessage("users.errorCode.EQUAL_PASSWORD") })
    readonly repassword: string;

    @ApiPropertyOptional({ description: "手机号", example: 18627467753 })
    readonly mobile?: number;

    @ApiProperty({
        required: false,
        default: 3,
        description: "用户角色 0-超级管理员|1-管理员|2-开发&测试&运营|3-普通用户",
    })
    @IsInt({ message: i18nValidationMessage("users.errorCode.ISINT_ROLE") })
    readonly role?: number;

    // @ApiProperty()
    // 可以使用@ApiPropertyOptional()速记装饰器来替代显式输入@ApiProperty({ required: false }) 装饰可选参数
    @ApiPropertyOptional({ default: 0, description: "用户状态" })
    @IsInt({ message: i18nValidationMessage("users.errorCode.ISINT_USERSTATE") })
    readonly userStatus?: number;
}
