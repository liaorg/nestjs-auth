import { RoleType } from "@/modules/role-types/enums";

// 系统默认用户
export const defaultUsers = [
    {
        // 用户名
        username: "admin",
        // 密码
        password: "A4dmin@84.",
        // 所属角色 systemAdmin|securityAdmin|auditAdmin 对应的 ObjectId
        role: "systemAdmin",
        rolename: "roleTypes.systemAdmin",
        roleType: RoleType.systemAdmin,
        // 用户所属路由, 对应 Controller 中定义的请求方法
        routePath: [],
        // 状态 0-失效|1-有效
        status: 1,
        // 锁定状态 0-未锁定|1-锁定
        lockStatus: 0,
        // 是否默认管理员 0-否|1-是
        isDefaultAdminer: 1,
    },
    {
        username: "sec",
        password: "S3ec@83.",
        role: "securityAdmin",
        rolename: "roleTypes.securityAdmin",
        roleType: RoleType.securityAdmin,
        routePath: [],
        status: 1,
        lockStatus: 0,
        isDefaultAdminer: "1",
    },
    {
        username: "audit",
        password: "A4udit@84.",
        role: "auditAdmin",
        rolename: "roleTypes.auditAdmin",
        roleType: RoleType.auditAdmin,
        routePath: [],
        status: 1,
        lockStatus: 0,
        isDefaultAdminer: 1,
    },
];
