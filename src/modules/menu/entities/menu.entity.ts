import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// 连接表名
@Entity("menu")
export class MenuEntity {
    @PrimaryGeneratedColumn()
    id: number;

    // 父菜单id
    @Column({ type: "integer", name: "parent_id", default: 0 })
    parentId: number;

    // 菜单路由路径
    @Column({ type: "varchar" })
    path: string;
    // 菜单名称，可以做为前端组件名要大写开头
    @Column({ type: "varchar" })
    name: string;
    // 本地化/国际化名称，对应 i18n 文件 menu.json 中的字段
    @Column({ type: "varchar" })
    locale: string;
    // 是否需要登录鉴权requiresAuth 0-否|1-是
    @Column({ type: "tinyint", name: "requires_auth", default: true })
    requiresAuth: boolean;
    // 是否在菜单中隐藏该项hideInMenu 0-否|1-是
    @Column({ type: "tinyint", name: "hide_in_menu", default: false })
    hideInMenu: boolean;
    // 图标
    @Column({ type: "varchar" })
    icon: string;
    // 排序值
    @Column({ type: "integer", default: 1 })
    order: number;
    // 状态：0-失效|1-有效|2-不可编辑
    @Column({ type: "tinyint", default: 1 })
    status: number;
}
