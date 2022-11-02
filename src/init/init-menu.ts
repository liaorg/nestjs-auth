/**
 * 添加菜单及权限关系
 */

import { MenuEntity } from "@/modules/menu/entities";
import { MenuPermissionRelationEntity, PermissionEntity } from "@/modules/permission/entities";
import { I18nService } from "nestjs-i18n";
import { sqlite3db } from "./db";
import { initLogger } from "./init-db";

// 添加菜单权限 menu menu_permission_relation
// 添加权限及关联关系
const addMenuPermissionRelationData = async (permissionRespository, menuId, menuPermissionRelationRespository) => {
    // 添加权限 permission
    const permission = { type: "menu" };
    const permissionData = await permissionRespository.save(permission);
    // 添加菜单权限关联关系 menu_permission_relation
    const menuPermissionRelation = { menuId, permissionId: permissionData.id };
    await menuPermissionRelationRespository.save(menuPermissionRelation);
};

// 添加子菜单
const addChildMenuData = async (opt) => {
    const { menuRespository, children, parentId, permissionRespository, menuPermissionRelationRespository } = opt;
    children.forEach(async (child) => {
        child.parentId = parentId;
        const data = await menuRespository.save(child);
        // 添加子菜单
        if (child.children?.length > 0) {
            await addChildMenuData({
                menuRespository,
                children: child.children,
                parentId: data.id,
                permissionRespository,
                menuPermissionRelationRespository,
            });
        }
        // 添加权限及关联关系
        await addMenuPermissionRelationData(permissionRespository, data.id, menuPermissionRelationRespository);
    });
};
// 添加菜单
export const addMenuData = async (defaultMenu, i18n: I18nService) => {
    const tablename = "menu";
    initLogger.log(i18n.t("init.begainInitTable", { args: { tablename } }));
    const menuRespository = sqlite3db.getRepository(MenuEntity);
    const permissionRespository = sqlite3db.getRepository(PermissionEntity);
    const menuPermissionRelationRespository = sqlite3db.getRepository(MenuPermissionRelationEntity);
    defaultMenu.forEach(async (item) => {
        const data: MenuEntity = await menuRespository.save(item);
        // 添加子菜单
        if (item.children?.length > 0) {
            await addChildMenuData({
                menuRespository,
                children: item.children,
                parentId: data.id,
                permissionRespository,
                menuPermissionRelationRespository,
            });
        }
        // 添加权限及关联关系
        await addMenuPermissionRelationData(permissionRespository, data.id, menuPermissionRelationRespository);
    });
    initLogger.log(i18n.t("init.finishedInitTable", { args: { tablename } }));
};
