/**
 * 添加页面route及权限关系
 */

import { PermissionEntity } from "@/modules/shared/permission/entities";
import { I18nService } from "nestjs-i18n";
import { AdminRouteInterface, defaultRoleGroupId, operateMethod } from "./consts";
import { DB } from "./db";
import { initLogger } from "./init-db";
import { Repository } from "typeorm";
import { RoleGroupEnum } from "@/modules/admin/role-group/enums";
import { AdminRouteEntity } from "@/modules/admin/common/entities/admin-route.entity";
import { RoleGroupPermissionRelationEntity } from "@/modules/admin/role-group/entities/role-group-permission-relation";
import { RolePermissionRelationEntity } from "@/modules/admin/role/entities/role-permission-relation";
import { AdminRoutePermissionRelationEntity } from "@/modules/admin/common/entities";

interface RepositoryInterface {
    adminRouteRepository: Repository<AdminRouteEntity>;
    permissionRepository: Repository<PermissionEntity>;
    adminRoutePermissionRelationRepository: Repository<AdminRoutePermissionRelationEntity>;
    roleGroupPermissionRelationRepository: Repository<RoleGroupPermissionRelationEntity>;
    rolePermissionRelationRepository: Repository<RolePermissionRelationEntity>;
}

// 添加角色权限
const addRolePermission = async (
    permissionId: number,
    roleGroup: RoleGroupEnum[],
    repository: RepositoryInterface,
) => {
    const { roleGroupPermissionRelationRepository, rolePermissionRelationRepository } = repository;
    roleGroup.forEach(async (id) => {
        // 添加角色组权限关联关系 role_group_permission_relation
        const roleGropuPermissionRelation = { roleGroupId: id, permissionId: permissionId };
        await roleGroupPermissionRelationRepository.save(roleGropuPermissionRelation);
        // 添加角色权限关联关系 role_permission_relation
        const rolePermissionRelation = { roleId: id, permissionId: permissionId };
        await rolePermissionRelationRepository.save(rolePermissionRelation);
    });
};

// 添加权限及关联关系
const addPermissionRelationData = async (
    adminRouteId: number,
    method: string,
    roleGroup: RoleGroupEnum[],
    repository: RepositoryInterface,
) => {
    const { permissionRepository, adminRoutePermissionRelationRepository } = repository;
    // 添加权限 permission
    const permission = { type: "admin_route" };
    const permissionData = await permissionRepository.save(permission);
    // 添加route操作权限关联关系 admin_route_operate_permission_relation
    // * 为默认支持全部操作可不添加
    // operateMethod = ["*", "GET", "POST", "DELETE", "PATCH", "PUT", "HEAD"];
    const operateId = operateMethod.indexOf(method);
    if (operateId !== -1) {
        const adminRoutePermissionRelation = {
            adminRouteId,
            permissionId: permissionData.id,
        };
        await adminRoutePermissionRelationRepository.save(adminRoutePermissionRelation);
        // 添加角色权限
        await addRolePermission(permissionData.id, roleGroup, repository);
    }
};

// 添加页面route数据
export const initAdminRouteData = async (adminRoute: AdminRouteInterface[], i18n: I18nService) => {
    const tablename = "admin_route";
    initLogger.log(i18n.t("init.begainInitTable", { args: { tablename } }));

    const repository: RepositoryInterface = {
        adminRouteRepository: DB.getRepository(AdminRouteEntity),
        permissionRepository: DB.getRepository(PermissionEntity),
        adminRoutePermissionRelationRepository: DB.getRepository(AdminRoutePermissionRelationEntity),
        roleGroupPermissionRelationRepository: DB.getRepository(RoleGroupPermissionRelationEntity),
        rolePermissionRelationRepository: DB.getRepository(RolePermissionRelationEntity),
    };
    adminRoute.forEach(async (item) => {
        const data: AdminRouteEntity = await repository.adminRouteRepository.save(item);
        // 添加route操作权限关联关系 admin_route_operate_permission_relation
        const roleGroup = item.roleGroup === "*" ? defaultRoleGroupId : item.roleGroup;
        await addPermissionRelationData(data.id, item.method, roleGroup, repository);
    });
    initLogger.log(i18n.t("init.finishedInitTable", { args: { tablename } }));
};
