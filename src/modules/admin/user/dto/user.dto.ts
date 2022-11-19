/**
 * import { PaginationListDto } from "@/common/dto";
 */
import { PaginationListDto } from "@/common/dto";

class UserMeta {
    /**
     * email
     */
    email: string;
    /**
     * 真实姓名
     */
    fullName: string;
    /**
     * 性别：0-未知|1-男|2-女
     */
    gender: number;
    /**
     * 部门
     */
    department: string;
    /**
     * 职务
     */
    duty: string;
    /**
     * 身份证号
     */
    idNumber: string;
    /**
     * 手机号
     */
    phoneNumber: number;
    /**
     * QQ
     */
    qq: number;
}
//用户包含角色信息-用户管理
export class UserDto {
    id: number;
    /**
     * 用户名
     * @example ['test']
     */
    name: string;
    /**
     * 角色Id
     */
    roleId: number;
    /**
     * 角色名称
     */
    roleName?: string;
    /**
     * 用户状态，0-停用|1-启用|2-锁定
     */
    status?: number;
    /**
     * 是否默认管理员：0-否|1-是
     */
    isDefault?: number;
    /**
     * 描述
     */
    description?: string;
    /**
     * 用户元数据
     */
    meta?: UserMeta;
}
/**
 * 用户列表
 */
export class UserListDto extends PaginationListDto {
    declare list: UserDto[];
}
/**
 * 获取指定用户信息-头部
 */
export class UserProfileDto {
    /**
     * 用户Id
     */
    id: number;
    /**
     * 用户名称
     */
    name: string;
    /**
     * 描述
     */
    description: string;
    /**
     * email
     */
    email: string;
    /**
     * 真实姓名
     */
    fullName: string;
    /**
     * 性别：0-未知|1-男|2-女
     */
    gender: number;
    /**
     * 部门
     */
    department: string;
    /**
     * 职务
     */
    duty: string;
    /**
     * 身份证号
     */
    idNumber: string;
    /**
     * 手机号
     */
    phoneNumber: number;
    /**
     * QQ
     */
    qq: number;
}
