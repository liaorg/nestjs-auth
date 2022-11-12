import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Exclude } from "class-transformer";

// 请求输入输出规范

export class UserInfoDto {
    // swagger 映射
    id: number;
    roleId?: number;
    @ApiProperty({ description: "用户名", example: "xciovpmn" })
    name?: string;
    @Exclude()
    password: string;
    // 密码盐值
    @Exclude()
    passwordSalt: string;

    @ApiProperty({ description: "用户姓名", example: "侯桂英" })
    realName?: string;

    @ApiPropertyOptional({ description: "手机号", example: 18627467753 })
    mobile?: number;

    @ApiProperty({
        required: false,
        default: "systemAdmin",
        description: "用户角色",
    })
    // role?: string;

    // @ApiProperty()
    // 可以使用@ApiPropertyOptional()速记装饰器来替代显式输入@ApiProperty({ required: false }) 装饰可选参数
    @ApiPropertyOptional({ default: 0, description: "用户状态" })
    status?: number;
}
