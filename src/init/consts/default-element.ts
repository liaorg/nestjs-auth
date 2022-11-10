import { RoleGroupEnum } from "@/modules/admin/role-group/enums";

// 要隐藏的页面元素
export interface ElementInterface {
    node: string;
    // 要隐藏的角色组id集合，*表示所有角色都有的操作
    roleGroup: "*" | RoleGroupEnum[];
}
export const defaultElement = [];
