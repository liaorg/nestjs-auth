import { getUTCTime } from "@/common/utils";
import { RoleGroupEnum } from "@/modules/role-group/enums";
import { randomBytes, scryptSync } from "crypto";

// 生成盐值
const createSalt = (size: number) => randomBytes(size).toString("hex");
// 生成密码
const createPassword = (password: string, salt: string) => {
    // 加密密码
    return scryptSync(password, salt, 64).toString("hex");
};
// 当前时间戳
const now = getUTCTime();

// 默认密码
// 当前年份
const year = now.year();
// 盐值长度
const size = 16;
const defaultAdmin = {
    systemAdmin: {
        name: "admin",
        password: `Admin@${year}`,
        passwordSalt: createSalt(size),
    },
    securityAdmin: {
        name: "sec",
        password: `Sec@${year}`,
        passwordSalt: createSalt(size),
    },
    auditAdmin: {
        name: "audit",
        password: `Audit@${year}`,
        passwordSalt: createSalt(size),
    },
};
defaultAdmin.systemAdmin.password = createPassword(
    defaultAdmin.systemAdmin.password,
    defaultAdmin.systemAdmin.passwordSalt,
);
defaultAdmin.securityAdmin.password = createPassword(
    defaultAdmin.securityAdmin.password,
    defaultAdmin.securityAdmin.passwordSalt,
);
defaultAdmin.auditAdmin.password = createPassword(
    defaultAdmin.auditAdmin.password,
    defaultAdmin.auditAdmin.passwordSalt,
);

export interface UserInterface {
    id: number;
    name: string;
    password: string;
    passwordSalt: string;
    isDefault: boolean;
    status: number;
}

export const defaultUser: UserInterface[] = [
    // 默认系统管理员
    {
        id: RoleGroupEnum.systemAdmin,
        ...defaultAdmin.systemAdmin,
        isDefault: true,
        status: 1,
    },
    // 默认业务安全员
    {
        id: RoleGroupEnum.securityAdmin,
        ...defaultAdmin.securityAdmin,
        isDefault: true,
        status: 1,
    },
    // 默认系统审计员
    {
        id: RoleGroupEnum.auditAdmin,
        ...defaultAdmin.auditAdmin,
        isDefault: true,
        status: 1,
    },
];

// 用户表和角色表关联表
// 一个用户只能属于一个角色
export const defaultUserRoleRelation = [
    { id: 1, userId: RoleGroupEnum.systemAdmin, roleId: RoleGroupEnum.systemAdmin },
    { id: 2, userId: RoleGroupEnum.securityAdmin, roleId: RoleGroupEnum.securityAdmin },
    { id: 3, userId: RoleGroupEnum.auditAdmin, roleId: RoleGroupEnum.auditAdmin },
];
