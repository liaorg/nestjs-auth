import { randomBytes, scryptSync } from "crypto";

// 生成盐值
export const createSalt = (size: number) => randomBytes(size).toString("hex");
// 生成密码
export const createPassword = (password: string, salt: string) => {
    // 加密密码
    return scryptSync(password, salt, 64).toString("hex");
};
