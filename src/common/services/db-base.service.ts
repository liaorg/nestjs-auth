import { EntityClassOrSchema } from "@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type";
import { Brackets, DataSource, ObjectLiteral, SelectQueryBuilder } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

/**
 * 公共服务 数据库操作服务
 * querybuilder
 */
export class DbBaseService<Entity extends ObjectLiteral> {
    entity: EntityClassOrSchema;
    alias: string;
    protected dataSource: DataSource;
    constructor(dataSource: DataSource, entity: EntityClassOrSchema, alias?: string) {
        this.entity = entity;
        this.alias = alias;
        this.dataSource = dataSource;
    }
    createQueryBuilder(): SelectQueryBuilder<Entity> {
        return this.dataSource.manager.createQueryBuilder(this.entity, this.alias);
    }
    // dto转为entity
    dto2entity(dto: ObjectLiteral, entity: Entity): Entity {
        for (const key in entity) {
            if (dto.hasOwnProperty(key)) {
                entity[key] = dto[key];
            }
        }
        return entity;
    }
    // entity转为dto
    entity2dto(entity: Entity, dto: ObjectLiteral): ObjectLiteral {
        for (const key in dto) {
            if (entity.hasOwnProperty(key)) {
                dto[key] = entity[key];
            }
        }
        return dto;
    }
    // 查询单条数据
    async findOneBy(
        where: string | ((qb: this) => string) | Brackets | ObjectLiteral | ObjectLiteral[],
    ) {
        const query = this.createQueryBuilder();
        return await query.where(where).getOne();
    }
    // 查询多条数据
    async findMany(
        where?: string | ((qb: this) => string) | Brackets | ObjectLiteral | ObjectLiteral[],
    ) {
        const query = this.createQueryBuilder();
        return await query.where(where).getMany();
    }
    // 查询分页数据
    async findPagination(
        where?: string | ((qb: this) => string) | Brackets | ObjectLiteral | ObjectLiteral[],
        page?: number,
        limit?: number,
    ) {
        const take = limit ? (limit < 1 ? 10 : limit) : 10;
        const skip = (page ? (page < 0 ? 0 : page) : 0) * take;
        // getManyAndCount 暂时存在问题 https://github.com/typeorm/typeorm/issues/8909
        // 只能单表查询
        const query = this.createQueryBuilder();
        return await query.where(where).skip(skip).take(take).getManyAndCount();
    }

    // 添加数据
    async insert(values: QueryDeepPartialEntity<Entity> | QueryDeepPartialEntity<Entity>[]) {
        const query = this.createQueryBuilder();
        return await query.insert().values(values).execute();
    }
    // 更新数据-返回影响行数
    async update(
        where: string | ((qb: this) => string) | Brackets | ObjectLiteral | ObjectLiteral[],
        values: QueryDeepPartialEntity<Entity>,
    ) {
        const query = this.createQueryBuilder();
        const updateData = await query.update().set(values).where(where).execute();
        return updateData.affected;
    }
    // 根据id批量更新数据-返回影响行数
    async updateByIds(
        ids: any | any[],
        values: QueryDeepPartialEntity<Entity>,
        where?: string | ((qb: this) => string) | Brackets | ObjectLiteral | ObjectLiteral[],
    ) {
        let query = this.createQueryBuilder().update().set(values).whereInIds(ids);
        if (where) {
            query = query.andWhere(where);
        }
        const updateData = await query.execute();
        return updateData.affected;
    }

    // 删除数据-返回影响行数
    async delete(
        where: string | ((qb: this) => string) | Brackets | ObjectLiteral | ObjectLiteral[],
        andWhere?: string | ((qb: this) => string) | Brackets | ObjectLiteral | ObjectLiteral[],
    ) {
        let query = this.createQueryBuilder().delete().where(where);
        if (andWhere) {
            query = query.andWhere(andWhere);
        }
        const deleteData = await query.execute();
        return deleteData.affected;
    }
    // 根据id批量删除数据-返回影响行数
    async deleteByids(
        ids: any | any[],
        where?: string | ((qb: this) => string) | Brackets | ObjectLiteral | ObjectLiteral[],
        andWhere?: string | ((qb: this) => string) | Brackets | ObjectLiteral | ObjectLiteral[],
    ) {
        let query = this.createQueryBuilder().delete().whereInIds(ids);
        if (where) {
            query = query.where(where);
        }
        if (andWhere) {
            query = query.andWhere(andWhere);
        }
        const deleteData = await query.execute();
        return deleteData.affected;
    }
    // 事务操作
    async transaction(trans: { (): Promise<any> }): Promise<any> {
        // 使用 QueryRunner 创建事务
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const result = await trans();
            if (result !== false) {
                // 没有错误时提交事务
                await queryRunner.commitTransaction();
            } else {
                // 如果遇到错误，可以回滚事务
                await queryRunner.rollbackTransaction();
            }
            return result;
        } catch (error) {
            // 如果遇到错误，可以回滚事务
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            // 释放创建的 queryRunner
            await queryRunner.release();
        }
    }
}
