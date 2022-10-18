import { CommonEntity } from "@/common/entities";
import { Column, Entity } from "typeorm";

/**
 * @class RoutesEntity 路由
 */

// 连接表名
@Entity("routes")
export class RoutesEntity extends CommonEntity {
    // 所属角色id：用逗号分隔
    @Column({ type: "varchar", name: "role_id" })
    roleId: string;

    // 父路由
    @Column({ type: "integer", name: "parent_id", unique: true })
    parentId: number;

    // 路由路径
    @Column({ type: "varchar" })
    path: string;

    // 路由名称，可以做为前端组件名要大写开头
    @Column({ type: "varchar" })
    name: string;

    // 本地化/国际化名称，对应 i18n 文件 routes.json 中的字段
    @Column({ type: "varchar" })
    locale: string;

    // 是否需要登录鉴权 0-否|1-是
    @Column({ type: "boolean", name: "requires_auth", default: true })
    requiresAuth: boolean;

    // 是否在菜单中隐藏该项 0-否|1-是
    @Column({ type: "boolean", name: "hide_in_menu", default: false })
    hideInMenu: boolean;

    // 图标
    @Column({ type: "varchar" })
    icon: string;

    // 排序值
    @Column({ type: "integer" })
    order: number;

    // 是否页面操作：0-否|1-是
    @Column({ type: "boolean", name: "is_sub_action", default: false })
    isSubAction: boolean;

    // 页面操作权限就是对应的http操作方法：*或者post|patch|delete|get，用逗号分隔
    @Column({ type: "varchar", name: "sub_action_permission" })
    subActionPermission: string;

    // 状态：0-失效|1-有效|2-不可编辑
    @Column({ type: "tinyint", default: 1 })
    status: number;
}
