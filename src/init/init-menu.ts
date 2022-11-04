/**
 * 添加菜单及权限关系
 */

import { MenuEntity } from "@/modules/menu/entities";
import {
    MenuPermissionRelationEntity,
    PermissionEntity,
    RoleGroupPermissionRelationEntity,
    RolePermissionRelationEntity,
} from "@/modules/permission/entities";
import { RoleGroupEnum } from "@/modules/role-group/enums";
import { I18nService } from "nestjs-i18n";
import { defaultRoleGroupId, MenuInterface } from "./consts";
import { sqlite3db } from "./db";
import { initLogger } from "./init-db";
import { Repository } from "typeorm";

interface RepositoryInterface {
    menuRepository: Repository<MenuEntity>;
    permissionRepository: Repository<PermissionEntity>;
    menuPermissionRelationRepository: Repository<MenuPermissionRelationEntity>;
    roleGroupPermissionRelationRepository: Repository<RoleGroupPermissionRelationEntity>;
    rolePermissionRelationRepository: Repository<RolePermissionRelationEntity>;
}

// 添加菜单权限 menu menu_permission_relation
// 添加角色组权限关联关系 role_group_permission_relation
// 添加角色权限关联关系 role_permission_relation
// 添加权限及关联关系
const addPermissionRelationData = async (
    menuId: number,
    roleGroup: RoleGroupEnum[],
    repository: RepositoryInterface,
) => {
    const {
        permissionRepository,
        menuPermissionRelationRepository,
        roleGroupPermissionRelationRepository,
        rolePermissionRelationRepository,
    } = repository;
    // 添加权限 permission
    const permission = { type: "menu" };
    const permissionData = await permissionRepository.save(permission);
    // 添加菜单权限关联关系 menu_permission_relation
    const menuPermissionRelation = { menuId, permissionId: permissionData.id };
    await menuPermissionRelationRepository.save(menuPermissionRelation);
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

// 添加子菜单
const addChildMenuData = async (
    children: MenuInterface[],
    parentId: number,
    roleGroup: RoleGroupEnum[],
    repository: RepositoryInterface,
) => {
    const { menuRepository } = repository;
    children.forEach(async (child) => {
        child.parentId = parentId;
        const data = await menuRepository.save(child);
        const chileRoleGroup = child.roleGroup
            ? child.roleGroup === "*"
                ? roleGroup
                : child.roleGroup.filter((id) => roleGroup.includes(id))
            : roleGroup;
        // 添加子菜单
        if (child.children?.length > 0) {
            await addChildMenuData(child.children, data.id, chileRoleGroup, repository);
        }
        // 添加权限及关联关系
        await addPermissionRelationData(data.id, chileRoleGroup, repository);
    });
};
// 添加菜单
export const initMenuData = async (menu: MenuInterface[], i18n: I18nService) => {
    const tablename = "menu";
    initLogger.log(i18n.t("init.begainInitTable", { args: { tablename } }));
    const repository: RepositoryInterface = {
        menuRepository: sqlite3db.getRepository(MenuEntity),
        permissionRepository: sqlite3db.getRepository(PermissionEntity),
        menuPermissionRelationRepository: sqlite3db.getRepository(MenuPermissionRelationEntity),
        roleGroupPermissionRelationRepository: sqlite3db.getRepository(RoleGroupPermissionRelationEntity),
        rolePermissionRelationRepository: sqlite3db.getRepository(RolePermissionRelationEntity),
    };
    menu.forEach(async (item) => {
        const data: MenuEntity = await repository.menuRepository.save(item);
        // 添加子菜单
        const roleGroup = item.roleGroup ? (item.roleGroup === "*" ? defaultRoleGroupId : item.roleGroup) : [];
        if (item.children?.length > 0) {
            await addChildMenuData(item.children, data.id, roleGroup, repository);
        }
        // 添加权限及关联关系
        await addPermissionRelationData(data.id, roleGroup, repository);
    });
    initLogger.log(i18n.t("init.finishedInitTable", { args: { tablename } }));
};
