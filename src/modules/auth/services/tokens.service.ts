import { Dayjs } from "dayjs";
import { getUTCTime } from "@/common/utils";
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { jwtConstants } from "../constants";
import { TokenPayloadDto } from "../dto";
import { nanoid } from "nanoid/async";
import { AccessTokensEntity, RefreshTokensEntity } from "../entities";
import { UsersEntity } from "@/modules/users/entities";
import { Response } from "express";

/**
 * 自定义中间件
 * 令牌服务
 */
@Injectable()
export class TokensService {
    constructor(private readonly jwtService: JwtService) {}
    /**
     * 根据accessToken刷新AccessToken与RefreshToken
     * @param accessToken
     * @param response
     * @returns
     */
    async refreshToken(accessToken: AccessTokensEntity, response: Response) {
        const { user, refreshToken } = accessToken;
        if (refreshToken) {
            const now = getUTCTime();
            // 判断 refreshToken 是否过期
            if (now.isAfter(refreshToken.expiredAt)) return null;
            // 如果没过期则生成新的 accessToken 和 refreshToken
            const token = await this.generateAccessToken(user, now);
            // 删除旧的 token
            await accessToken.remove();
            response.header("token", token.accessToken.value);
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
    async generateAccessToken(user: UsersEntity, now: Dayjs) {
        const accessTokenPayload: TokenPayloadDto = {
            sub: user.id.toString(),
            iat: now.unix(),
        };
        const signed = await this.jwtService.signAsync(accessTokenPayload);
        const accessToken = new AccessTokensEntity();
        accessToken.value = signed;
        accessToken.user = user;
        accessToken.expiredAt = now.add(jwtConstants.tokenExpired, "second").unix();
        // accessToken 存入数据库
        await accessToken.save();
        // 生成刷新令牌
        const refreshToken = await this.generateRefreshToken(accessToken, getUTCTime());
        return { accessToken, refreshToken };
    }
    /**
     * 生成新的RefreshToken并存入数据库
     *
     * @param accessToken
     * @param now
     * @returns
     */
    async generateRefreshToken(accessToken: AccessTokensEntity, now: Dayjs): Promise<RefreshTokensEntity> {
        const refreshTokenPayload: TokenPayloadDto = {
            sub: await nanoid(),
            iat: now.unix(),
        };
        const signed = await this.jwtService.signAsync(refreshTokenPayload);
        const refreshToken = new RefreshTokensEntity();
        refreshToken.value = signed;
        refreshToken.expiredAt = now.add(jwtConstants.refreshTokenExpired, "second").unix();
        refreshToken.accessToken = accessToken;
        await refreshToken.save();
        return refreshToken;
    }
    /**
     * 检查accessToken是否存在
     *
     * @param {string} value
     * @returns
     */
    async checkAccessToken(value: string) {
        return AccessTokensEntity.findOne({
            where: { value },
            relations: ["user", "refreshToken"],
        });
    }

    /**
     * 移除AccessToken且自动移除关联的RefreshToken
     *
     * @param {string} value
     */
    async removeAccessToken(value: string) {
        const accessToken = await AccessTokensEntity.findOne({
            where: { value },
        });
        if (accessToken) await accessToken.remove();
    }

    /**
     * 移除RefreshToken
     *
     * @param {string} value
     */
    async removeRefreshToken(value: string) {
        const refreshToken = await RefreshTokensEntity.findOne({
            where: { value },
            relations: ["accessToken"],
        });
        if (refreshToken) {
            if (refreshToken.accessToken) await refreshToken.accessToken.remove();
            await refreshToken.remove();
        }
    }
}
