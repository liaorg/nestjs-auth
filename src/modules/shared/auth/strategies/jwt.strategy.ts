// 用户认证 JWT 策略
import { UserService } from "@/modules/admin/user/user.service";
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtConstants } from "../constants";
import { RequestUserDto } from "../dto";

/**
 * JWT荷载
 *
 * @export
 * @interface JwtPayload
 */
export interface JwtPayload {
    sub: number;
    iat: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret,
        });
    }

    /**
     * 通过荷载解析出用户ID
     * 通过用户ID查询出用户是否存在,并把id放入request方便后续操作
     */
    async validate(payload: JwtPayload): Promise<RequestUserDto> {
        const user = await this.userService.findOne(payload.sub);
        // 这边的返回将写入 request.user
        return {
            id: user.id,
            name: user.name,
        };
    }
}
