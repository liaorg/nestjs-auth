/**
 * 添加页面元素及权限关系
 * element
 */

import {
    ElementEntity,
    ElementPermissionRelationEntity,
    PermissionEntity,
    RoleGroupPermissionRelationEntity,
    RolePermissionRelationEntity,
} from "@/modules/permission/entities";
import { RoleGroupEnum } from "@/modules/role-group/enums";
import { I18nService } from "nestjs-i18n";
import { Repository } from "typeorm";
import { defaultRoleGroupId, ElementInterface } from "./consts";
import { sqlite3db } from "./db";
import { initLogger } from "./init-db";

interface RepositoryInterface {
    elementRepository: Repository<ElementEntity>;
    permissionRepository: Repository<PermissionEntity>;
    elementPermissionRelationRepository: Repository<ElementPermissionRelationEntity>;
    roleGroupPermissionRelationRepository: Repository<RoleGroupPermissionRelationEntity>;
    rolePermissionRelationRepository: Repository<RolePermissionRelationEntity>;
}
// 添加权限及关联关系
const addElementPermissionRelationData = async (
    elementId: number,
    roleGroup: RoleGroupEnum[],
    repository: RepositoryInterface,
) => {
    const {
        permissionRepository,
        elementPermissionRelationRepository,
        roleGroupPermissionRelationRepository,
        rolePermissionRelationRepository,
    } = repository;
    // 添加权限 permission
    const permission = { type: "element" };
    const permissionData = await permissionRepository.save(permission);
    // 添加页面元素和权限的关联关系 element_permission_relation
    const elementPermissionRelation = { elementId, permissionId: permissionData.id };
    await elementPermissionRelationRepository.save(elementPermissionRelation); // 添加角色权限
    roleGroup.forEach(async (id) => {
        // 添加角色组权限关联关系 role_group_permission_relation
        const roleGropuPermissionRelation = { roleGroupId: id, permissionId: permissionData.id };
        await roleGroupPermissionRelationRepository.save(roleGropuPermissionRelation);
        // 添加角色权限关联关系 role_permission_relation
        const rolePermissionRelation = { roleId: id, permissionId: permissionData.id };
        await rolePermissionRelationRepository.save(rolePermissionRelation);
    });
};

// 添加页面元素数据
export const initElementData = async (element: ElementInterface[], i18n: I18nService) => {
    const tablename = "element";
    initLogger.log(i18n.t("init.begainInitTable", { args: { tablename } }));
    const repository: RepositoryInterface = {
        elementRepository: sqlite3db.getRepository(ElementEntity),
        permissionRepository: sqlite3db.getRepository(PermissionEntity),
        elementPermissionRelationRepository: sqlite3db.getRepository(ElementPermissionRelationEntity),
        roleGroupPermissionRelationRepository: sqlite3db.getRepository(RoleGroupPermissionRelationEntity),
        rolePermissionRelationRepository: sqlite3db.getRepository(RolePermissionRelationEntity),
    };
    element.forEach(async (item) => {
        const data: ElementEntity = await repository.elementRepository.save(item);
        // 添加菜单权限关联关系 element_permission_relation
        const roleGroup = item.roleGroup === "*" ? defaultRoleGroupId : item.roleGroup;
        await addElementPermissionRelationData(data.id, roleGroup, repository);
    });
    initLogger.log(i18n.t("init.finishedInitTable", { args: { tablename } }));
};
