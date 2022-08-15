import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

// 请求输入输出规范

export class UserInfoDto {
    // swagger 映射
    @ApiProperty({ description: "用户名", example: "xciovpmn" })
    readonly username: string;

    @ApiProperty({ description: "用户姓名", example: "侯桂英" })
    readonly realName?: string;

    @ApiPropertyOptional({ description: "手机号", example: 18627467753 })
    readonly mobile?: number;

    @ApiProperty({
        required: false,
        default: 3,
        description: "用户角色 0-超级管理员|1-管理员|2-开发&测试&运营|3-普通用户",
    })
    readonly role?: number;

    // @ApiProperty()
    // 可以使用@ApiPropertyOptional()速记装饰器来替代显式输入@ApiProperty({ required: false }) 装饰可选参数
    @ApiPropertyOptional({ default: 0, description: "用户状态" })
    readonly userStatus?: number;
}
