/**
 * 角色类型, 出厂固定为:
 * @value 1 systemAdmin 系统管理员
 * @value 2 securityAdmin 业务安全审计员
 * @value 3 auditAdmin 系统日志审计员
 */
export enum RoleType {
    // 系统管理员
    systemAdmin = 1,
    // 业务安全审计员
    securityAdmin = 2,
    // 系统日志审计员
    auditAdmin = 3,
}
