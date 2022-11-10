/**
 * 添加页面api及权限关系
 * 添加失败要回滚
 */

import { OperatePermissionRelationEntity, PermissionEntity } from "@/modules/shared/permission/entities";
import { I18nService } from "nestjs-i18n";
import { AdminApiInterface, defaultRoleGroupId, operateMethod } from "./consts";
import { dbConfig, DB } from "./db";
import { initLogger } from "./init-db";
import { QueryRunner, Repository } from "typeorm";
import { RoleGroupEnum } from "@/modules/admin/role-group/enums";
import { basename } from "path";
import { AdminApiEntity } from "@/modules/admin/common/entities/admin-api.entity";
import { AdminApiPermissionRelationEntity } from "@/modules/admin/common/entities/admin-api-permission-relation.entity";
import { RoleGroupPermissionRelationEntity } from "@/modules/admin/role-group/entities/role-group-permission-relation";
import { RolePermissionRelationEntity } from "@/modules/admin/role/entities/role-permission-relation";

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
    queryRunner: QueryRunner,
    repository: RepositoryInterface,
) => {
    const {
        permissionRepository,
        adminApiPermissionRelationRepository,
        roleGroupPermissionRelationRepository,
        rolePermissionRelationRepository,
    } = repository;
    // 添加权限 permission
    const permission = permissionRepository.create({ type: "admin_api" });
    const permissionData = await queryRunner.manager.save(permission);
    // 添加菜单权限关联关系 admin_api_permission_relation
    const adminApiPermissionRelation = adminApiPermissionRelationRepository.create({
        adminApiId,
        permissionId: permissionData.id,
    });
    await queryRunner.manager.save(adminApiPermissionRelation);
    // 添加角色权限
    roleGroup.forEach(async (id) => {
        // 添加角色组权限关联关系 role_group_permission_relation
        const roleGropuPermissionRelation = roleGroupPermissionRelationRepository.create({
            roleGroupId: id,
            permissionId: permissionData.id,
        });
        await queryRunner.manager.save(roleGropuPermissionRelation);
        // 添加角色权限关联关系 role_permission_relation
        const rolePermissionRelation = rolePermissionRelationRepository.create({
            roleId: id,
            permissionId: permissionData.id,
        });
        await queryRunner.manager.save(rolePermissionRelation);
    });
};

// 添加每个api对应的操作权限
const addOperatePermissionRelationData = async (
    operateId: number,
    queryRunner: QueryRunner,
    repository: RepositoryInterface,
) => {
    const { permissionRepository, operatePermissionRelationRepository } = repository;
    // 添加权限 permission
    const permission = { type: "operate" };
    const permissionData = await permissionRepository.save(permission);
    // 添加操作和权限的关联关系 operate_permission_relation
    const operatePermissionRelation = operatePermissionRelationRepository.create({
        operateId,
        permissionId: permissionData.id,
    });
    await queryRunner.manager.save(operatePermissionRelation);
};

// 添加页面api数据
export const addAdminApiData = async (adminApi: AdminApiInterface[], i18n: I18nService) => {
    try {
        await DB.initialize();
        initLogger.log(i18n.t("init.dbConnected") + ` ${basename(dbConfig.database as string)}`);
        const tablename = "admin_api";
        initLogger.log(i18n.t("init.begainAddData", { args: { tablename } }));

        const repository: RepositoryInterface = {
            adminApiRepository: DB.getRepository(AdminApiEntity),
            permissionRepository: DB.getRepository(PermissionEntity),
            adminApiPermissionRelationRepository: DB.getRepository(AdminApiPermissionRelationEntity),
            operatePermissionRelationRepository: DB.getRepository(OperatePermissionRelationEntity),
            roleGroupPermissionRelationRepository: DB.getRepository(RoleGroupPermissionRelationEntity),
            rolePermissionRelationRepository: DB.getRepository(RolePermissionRelationEntity),
        };
        // 使用 QueryRunner 创建事务
        const queryRunner = DB.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            for (let index = 0; index < adminApi.length; index++) {
                const item = adminApi[index];
                const entity = repository.adminApiRepository.create({ path: item.path, method: item.method });
                const data: AdminApiEntity = await queryRunner.manager.save(entity);
                // 添加api权限关联关系 admin_api_permission_relation
                const roleGroup = item.roleGroup === "*" ? defaultRoleGroupId : item.roleGroup;
                await addPermissionRelationData(data.id, roleGroup, queryRunner, repository);
                // 添加操作和权限的关联关系 operate_permission_relation
                // * 为默认支持全部操作可不添加
                // operateMethod = ["*", "GET", "POST", "DELETE", "PATCH", "PUT", "HEAD"];
                const operateId = operateMethod.indexOf(item.method);
                if (operateId > 0) {
                    await addOperatePermissionRelationData(operateId, queryRunner, repository);
                }
            }
            // 没有错误时提交事务
            await queryRunner.commitTransaction();
        } catch (error) {
            // 如果遇到错误，可以回滚事务
            await queryRunner.rollbackTransaction();
            initLogger.log(i18n.t("init.addDataFailed", { args: { tablename } }));
        } finally {
            // 释放创建的 queryRunner
            await queryRunner.release();
        }
        initLogger.log(i18n.t("init.finishedAddData", { args: { tablename } }));
    } catch (error) {
        initLogger.log(i18n.t("init.dbConnectedFailed"));
        console.log(error);
    }
};
