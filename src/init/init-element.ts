/**
 * 添加页面元素及权限关系
 * element
 */

import { ElementEntity, ElementPermissionRelationEntity, PermissionEntity } from "@/modules/permission/entities";
import { I18nService } from "nestjs-i18n";
import { sqlite3db } from "./db";
import { initLogger } from "./init-db";

// 添加权限及关联关系
const addElementPermissionRelationData = async (
    permissionRespository,
    elementId,
    elementPermissionRelationRespository,
) => {
    // 添加权限 permission
    const permission = { type: "element" };
    const permissionData = await permissionRespository.save(permission);
    // 添加页面元素和权限的关联关系 element_permission_relation
    const elementPermissionRelation = { elementId, permissionId: permissionData.id };
    await elementPermissionRelationRespository.save(elementPermissionRelation);
};

// 添加页面无数数据
export const addElementData = async (defaultElement, i18n: I18nService) => {
    const tablename = "element";
    initLogger.log(i18n.t("init.begainInitTable", { args: { tablename } }));
    const elementRespository = sqlite3db.getRepository(ElementEntity);
    const permissionRespository = sqlite3db.getRepository(PermissionEntity);
    const elementPermissionRelationRespository = sqlite3db.getRepository(ElementPermissionRelationEntity);
    defaultElement.forEach(async (item) => {
        const data: ElementEntity = await elementRespository.save(item);
        // 添加菜单权限关联关系 element_permission_relation
        await addElementPermissionRelationData(permissionRespository, data.id, elementPermissionRelationRespository);
    });
    initLogger.log(i18n.t("init.finishedInitTable", { args: { tablename } }));
};
