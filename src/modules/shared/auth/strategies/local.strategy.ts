import { AuthError } from "@/common/constants";
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthException } from "../auth.exception";
import { AuthService } from "../auth.service";
import { RequestUserDto } from "../dto";

// 本地策略
// 根据项目的需求来决定是否需要本地策略

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super();
    }

    async validate(name: string, password: string): Promise<RequestUserDto> {
        // TODO 查询验证验证码
        // TODO 查询验证多因子
        // 查询用户并比较密码
        const user = await this.authService.validateUser(name, password);
        if (!user) {
            const error = {
                ...AuthError.wrongUserOrPassword,
            };
            throw new AuthException(error);
        }
        // 这边的返回将写入 request.user
        return {
            id: user.id,
            name: user.name,
        };
    }
}
