/**
 * 添加页面api及权限关系
 */

import {
    AdminApiEntity,
    AdminApiPermissionRelationEntity,
    OperatePermissionRelationEntity,
    PermissionEntity,
} from "@/modules/permission/entities";
import { I18nService } from "nestjs-i18n";
import { operateMethod } from "./consts";
import { sqlite3db } from "./db";
import { initLogger } from "./init-db";

// 添加权限及关联关系
const addAdminApiPermissionRelationData = async (
    permissionRespository,
    adminApiId,
    adminApiPermissionRelationRespository,
) => {
    // 添加权限 permission
    const permission = { type: "admin_api" };
    const permissionData = await permissionRespository.save(permission);
    // 添加菜单权限关联关系 admin_api_permission_relation
    const adminApiPermissionRelation = { adminApiId, permissionId: permissionData.id };
    // const adminApiPermissionRelation = new AdminApiPermissionRelationEntity();
    // adminApiPermissionRelation.adminApiId = adminApiId;
    // adminApiPermissionRelation.permissionId = permissionData.id;
    await adminApiPermissionRelationRespository.save(adminApiPermissionRelation);
};

const addOperatePermissionRelationData = async (
    permissionRespository,
    operateId,
    operatePermissionRelationRespository,
) => {
    // 添加权限 permission
    const permission = { type: "operate" };
    const permissionData = await permissionRespository.save(permission);
    // 添加操作和权限的关联关系 operate_permission_relation
    const operatePermissionRelation = { operateId, permissionId: permissionData.id };
    await operatePermissionRelationRespository.save(operatePermissionRelation);
};

// 添加页面api数据
export const addAdminApiData = async (defaultAdminApi, i18n: I18nService) => {
    const tablename = "admin_api";
    initLogger.log(i18n.t("init.begainInitTable", { args: { tablename } }));
    const menuRespository = sqlite3db.getRepository(AdminApiEntity);
    const permissionRespository = sqlite3db.getRepository(PermissionEntity);
    const adminApiPermissionRelationRespository = sqlite3db.getRepository(AdminApiPermissionRelationEntity);
    const operatePermissionRelationRespository = sqlite3db.getRepository(OperatePermissionRelationEntity);
    defaultAdminApi.forEach(async (item) => {
        const data: AdminApiEntity = await menuRespository.save(item);
        // 添加api权限关联关系 admin_api_permission_relation
        await addAdminApiPermissionRelationData(permissionRespository, data.id, adminApiPermissionRelationRespository);
        // 添加操作和权限的关联关系 operate_permission_relation
        // * 为默认支持全部操作可不添加
        const operateId = operateMethod.indexOf(item.method);
        if (operateId > 0) {
            await addOperatePermissionRelationData(
                permissionRespository,
                operateId + 1,
                operatePermissionRelationRespository,
            );
        }
    });
    initLogger.log(i18n.t("init.finishedInitTable", { args: { tablename } }));
};
