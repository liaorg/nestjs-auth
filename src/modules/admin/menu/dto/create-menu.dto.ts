import { RequestValidationSchema } from "@/common/decorators";
import { CreateMenuSchema } from "../schemas";

/**
 * 注入验证 schema 对象
 */
@RequestValidationSchema(CreateMenuSchema)
export class CreateMenuDto {
    /**
     * 父菜单id
     * @example 1
     */
    parentId?: number;
    /**
     * 菜单路由路径
     */
    path: string;
    /**
     * 菜单名称，可以做为前端组件名要大写开头
     */
    name?: string;
    /**
     * 本地化/国际化名称，对应 i18n 文件 menu.json 中的字段
     */
    local?: string;
    /**
     * 是否需要登录鉴权requiresAuth 0-否|1-是
     */
    requiresAuth?: boolean;
    /**
     * 是否在菜单中隐藏该项hideInMenu 0-否|1-是
     */
    hideInMenu?: boolean;
    /**
     * 图标
     */
    icon?: string;
    /**
     * 排序值
     */
    order?: number;
    /**
     * 状态：0-失效|1-有效|2-不可编辑
     */
    status?: number;
}
