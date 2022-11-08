/**
 * 添加页面api及权限关系
 */

import {
    AdminApiEntity,
    AdminApiPermissionRelationEntity,
    OperatePermissionRelationEntity,
    PermissionEntity,
    RoleGroupPermissionRelationEntity,
    RolePermissionRelationEntity,
} from "@/modules/permission/entities";
import { I18nService } from "nestjs-i18n";
import { AdminApiInterface, defaultRoleGroupId, operateMethod } from "./consts";
import { DB } from "./db";
import { initLogger } from "./init-db";
import { Repository } from "typeorm";
import { RoleGroupEnum } from "@/modules/role-group/enums";

interface RepositoryInterface {
    adminApiRepository: Repository<AdminApiEntity>;
    permissionRepository: Repository<PermissionEntity>;
    adminApiPermissionRelationRepository: Repository<AdminApiPermissionRelationEntity>;
    operatePermissionRelationRepository: Repository<OperatePermissionRelationEntity>;
    roleGroupPermissionRelationRepository: Repository<RoleGroupPermissionRelationEntity>;
    rolePermissionRelationRepository: Repository<RolePermissionRelationEntity>;
}

// 添加权限及关联关系
const addPermissionRelationData = async (
    adminApiId: number,
    roleGroup: RoleGroupEnum[],
    repository: RepositoryInterface,
) => {
    const {
        permissionRepository,
        adminApiPermissionRelationRepository,
        roleGroupPermissionRelationRepository,
        rolePermissionRelationRepository,
    } = repository;
    // 添加权限 permission
    const permission = { type: "admin_api" };
    const permissionData = await permissionRepository.save(permission);
    // 添加菜单权限关联关系 admin_api_permission_relation
    const adminApiPermissionRelation = { adminApiId, permissionId: permissionData.id };
    await adminApiPermissionRelationRepository.save(adminApiPermissionRelation);
    // 添加角色权限
    roleGroup.forEach(async (id) => {
        // 添加角色组权限关联关系 role_group_permission_relation
        const roleGropuPermissionRelation = { roleGroupId: id, permissionId: permissionData.id };
        await roleGroupPermissionRelationRepository.save(roleGropuPermissionRelation);
        // 添加角色权限关联关系 role_permission_relation
        const rolePermissionRelation = { roleId: id, permissionId: permissionData.id };
        await rolePermissionRelationRepository.save(rolePermissionRelation);
    });
};

// 添加每个api对应的操作权限
const addOperatePermissionRelationData = async (operateId: number, repository: RepositoryInterface) => {
    const { permissionRepository, operatePermissionRelationRepository } = repository;
    // 添加权限 permission
    const permission = { type: "operate" };
    const permissionData = await permissionRepository.save(permission);
    // 添加操作和权限的关联关系 operate_permission_relation
    const operatePermissionRelation = { operateId, permissionId: permissionData.id };
    await operatePermissionRelationRepository.save(operatePermissionRelation);
};

// 添加页面api数据
export const initAdminApiData = async (adminApi: AdminApiInterface[], i18n: I18nService) => {
    const tablename = "admin_api";
    initLogger.log(i18n.t("init.begainInitTable", { args: { tablename } }));

    const repository: RepositoryInterface = {
        adminApiRepository: DB.getRepository(AdminApiEntity),
        permissionRepository: DB.getRepository(PermissionEntity),
        adminApiPermissionRelationRepository: DB.getRepository(AdminApiPermissionRelationEntity),
        operatePermissionRelationRepository: DB.getRepository(OperatePermissionRelationEntity),
        roleGroupPermissionRelationRepository: DB.getRepository(RoleGroupPermissionRelationEntity),
        rolePermissionRelationRepository: DB.getRepository(RolePermissionRelationEntity),
    };
    adminApi.forEach(async (item) => {
        const data: AdminApiEntity = await repository.adminApiRepository.save(item);
        // 添加api权限关联关系 admin_api_permission_relation
        const roleGroup = item.roleGroup === "*" ? defaultRoleGroupId : item.roleGroup;
        await addPermissionRelationData(data.id, roleGroup, repository);
        // 添加操作和权限的关联关系 operate_permission_relation
        // * 为默认支持全部操作可不添加
        // operateMethod = ["*", "GET", "POST", "DELETE", "PATCH", "PUT", "HEAD"];
        const operateId = operateMethod.indexOf(item.method);
        if (operateId > 0) {
            await addOperatePermissionRelationData(operateId, repository);
        }
    });
    initLogger.log(i18n.t("init.finishedInitTable", { args: { tablename } }));
};
