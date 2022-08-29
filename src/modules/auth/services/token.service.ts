import { Dayjs } from "dayjs";
import { getUTCTime } from "@/common/utils";
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { jwtConstants } from "../constants";
import { InjectModel } from "@nestjs/mongoose";
import { AccessToken, AccessTokenDocument } from "../schemas";
import { Model } from "mongoose";
import { AccessTokenDto, RefreshTokenDto, RequestUserDto, TokenPayloadDto } from "../dto";
import { AuthException } from "../auth.exception";
import { AuthError } from "@/common/constants";
import { nanoid } from "nanoid/async";

/**
 * 自定义中间件
 * 令牌服务
 */
@Injectable()
export class TokenService {
    constructor(
        private readonly jwtService: JwtService,
        // 使用 @InjectModel() 装饰器注入 模型
        @InjectModel(AccessToken.name) private accessTokenModel: Model<AccessTokenDocument>,
    ) {}
    /**
     * 根据accessToken刷新AccessToken与RefreshToken
     * @param accessToken
     * @param response
     * @returns
     */
    async refreshToken(accessToken, response) {
        const { _id, user, refreshToken } = accessToken;
        if (refreshToken) {
            const now = getUTCTime();
            // 判断 refreshToken 是否过期
            if (now.isAfter(refreshToken.expiredAt)) return null;
            // 如果没过期则生成新的 accessToken 和 refreshToken
            const token = await this.generateAccessToken(user, now);
            // 删除旧的 token
            await this.accessTokenModel.findByIdAndDelete(_id);
            response.header("accessToken", token.accessToken.value);
            return token;
        }
        return null;
    }
    /**
     * 根据荷载签出新的AccessToken并存入数据库
     * 且自动生成新的Refresh也存入数据库
     *
     * @param user
     * @param now
     * @returns
     * @memberof TokenService
     */
    async generateAccessToken(user: RequestUserDto, now: Dayjs) {
        const accessTokenPayload: TokenPayloadDto = {
            sub: user._id.toString(),
            iat: now.unix(),
        };
        const signed = await this.jwtService.signAsync(accessTokenPayload);
        const accessToken: AccessTokenDto = {
            value: signed,
            user,
            expiredAt: now.add(jwtConstants.tokenExpired, "second").unix(),
        };
        const refreshToken = await this.generateRefreshToken(getUTCTime());
        // accessToken 存入数据库
        accessToken.refreshToken = refreshToken;
        await this.accessTokenModel.create(accessToken);
        return { accessToken, refreshToken };
    }
    /**
     * 生成新的RefreshToken并存入数据库
     *
     * @param now
     * @returns
     * @memberof TokenService
     */
    async generateRefreshToken(now: Dayjs) {
        const refreshTokenPayload: TokenPayloadDto = {
            sub: await nanoid(),
            iat: now.unix(),
        };
        const signed = await this.jwtService.signAsync(refreshTokenPayload);
        const refreshToken: RefreshTokenDto = {
            value: signed,
            expiredAt: now.add(jwtConstants.refreshTokenExpired, "second").unix(),
        };
        return refreshToken;
    }
    /**
     * 检查accessToken是否存在
     *
     * @param {string} value
     * @returns
     * @memberof TokenService
     */
    async checkAccessToken(value: string) {
        const accessToken = await this.accessTokenModel.findOne({ value }).exec();
        // console.log("checkAccessToken", accessToken);
        return accessToken;
    }

    /**
     * 移除AccessToken且自动移除关联的RefreshToken
     *
     * @param {string} value
     * @memberof TokenService
     */
    async removeAccessToken(value: string) {
        if (!(await this.accessTokenModel.findOneAndDelete({ value }))) {
            // 失败要重新登录
            const error = {
                statusCode: 500,
                ...AuthError.logoutFailed,
            };
            throw new AuthException(error);
        }
        return true;
    }
}
