import { Dayjs } from "dayjs";
import { getUTCTime } from "@/common/utils";
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { jwtConstants } from "../constants";
import { TokenPayloadDto } from "../dto";
import { nanoid } from "nanoid/async";
import { AccessTokenEntity, RefreshTokenEntity } from "../entities";
import { Response } from "express";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

/**
 * 自定义中间件
 * 令牌服务
 */
@Injectable()
export class TokenService {
    constructor(
        private readonly jwtService: JwtService,
        // 使用 @InjectRepository() 装饰器注入 存储库
        @InjectRepository(AccessTokenEntity)
        private accessTokenRepository: Repository<AccessTokenEntity>,
        @InjectRepository(RefreshTokenEntity)
        private refreshTokenRepository: Repository<RefreshTokenEntity>,
    ) {}
    /**
     * 根据accessToken刷新AccessToken与RefreshToken
     * @param accessToken
     * @param response
     * @returns
     */
    async refreshToken(accessToken: AccessTokenEntity, response: Response) {
        const { userId, id } = accessToken;
        const refreshToken = await this.getRefreshTokenById(id);
        if (refreshToken) {
            const now = getUTCTime();
            // 判断 refreshToken 是否过期
            if (now.isAfter(refreshToken.expiredAt)) return null;
            // 如果没过期则生成新的 accessToken 和 refreshToken
            const token = await this.generateAccessToken(userId, now);
            // 删除旧的 token
            await this.accessTokenRepository.remove(accessToken);
            response.header("token", token.accessToken.value);
            return token;
        }
        return null;
    }
    /**
     * 根据荷载签出新的AccessToken并存入数据库
     * 且自动生成新的Refresh也存入数据库
     *
     * @param userId
     * @param now
     * @returns
     * @memberof TokenService
     */
    async generateAccessToken(userId: number, now: Dayjs) {
        const accessTokenPayload: TokenPayloadDto = {
            sub: userId.toString(),
            iat: now.unix(),
        };
        const signed = await this.jwtService.signAsync(accessTokenPayload);
        const accessToken = new AccessTokenEntity();
        accessToken.value = signed;
        accessToken.userId = userId;
        accessToken.expiredAt = now.add(jwtConstants.tokenExpired, "second").unix();
        // accessToken 存入数据库
        await this.accessTokenRepository.save(accessToken);
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
    async generateRefreshToken(accessToken: AccessTokenEntity, now: Dayjs): Promise<RefreshTokenEntity> {
        const refreshTokenPayload: TokenPayloadDto = {
            sub: await nanoid(),
            iat: now.unix(),
        };
        const signed = await this.jwtService.signAsync(refreshTokenPayload);
        const refreshToken = new RefreshTokenEntity();
        refreshToken.value = signed;
        refreshToken.expiredAt = now.add(jwtConstants.refreshTokenExpired, "second").unix();
        refreshToken.accessTokenId = accessToken.id;
        await this.refreshTokenRepository.save(refreshToken);
        return refreshToken;
    }
    /**
     * 根据 accessTokenId 获取 refreshToken
     *
     * @param {string} accessTokenId
     * @returns
     */
    async getRefreshTokenById(accessTokenId: string): Promise<RefreshTokenEntity> {
        return await this.refreshTokenRepository.findOneBy({ accessTokenId });
    }

    /**
     * 根据 refreshTokenId 获取 accessToken
     *
     * @param {string} refreshTokenId
     * @returns
     */
    async getAccessTokenById(refreshTokenId: string): Promise<AccessTokenEntity> {
        return await this.accessTokenRepository.findOneBy({ id: refreshTokenId });
    }

    /**
     * 检查accessToken是否存在
     *
     * @param {string} value
     * @returns
     */
    async checkAccessToken(value: string) {
        return await this.accessTokenRepository.findOneBy({ value });
    }

    /**
     * 移除AccessToken且自动移除关联的RefreshToken
     *
     * @param {string} value
     */
    async removeAccessToken(value: string) {
        const accessToken = await this.accessTokenRepository.findOneBy({ value });
        if (accessToken) {
            const refreshToken = await this.getRefreshTokenById(accessToken.id);
            if (refreshToken) await this.refreshTokenRepository.remove(refreshToken);
            await this.accessTokenRepository.remove(accessToken);
        }
    }

    /**
     * 移除RefreshToken
     *
     * @param {string} value
     */
    async removeRefreshToken(value: string) {
        const refreshToken = await this.refreshTokenRepository.findOneBy({ value });
        if (refreshToken) {
            const accessToken = await this.getAccessTokenById(refreshToken.accessTokenId);
            if (accessToken) await this.accessTokenRepository.remove(accessToken);
            await this.refreshTokenRepository.remove(refreshToken);
        }
    }
}
