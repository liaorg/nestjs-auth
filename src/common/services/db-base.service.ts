import { EntityClassOrSchema } from "@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type";
import { Brackets, DataSource, ObjectLiteral, SelectQueryBuilder } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

/**
 * 公共服务 数据库查询服务
 * querybuilder
 */
export class DbBaseService<Entity extends ObjectLiteral> {
    entity: EntityClassOrSchema;
    alias: string;
    query: SelectQueryBuilder<Entity>;
    protected dataSource: DataSource;
    constructor(dataSource: DataSource, entity: EntityClassOrSchema, alias?: string) {
        this.entity = entity;
        this.alias = alias;
        this.query = dataSource.manager.createQueryBuilder(this.entity, this.alias);
    }
    // 查询单条数据
    async findOneBy(
        where: string | ((qb: this) => string) | Brackets | ObjectLiteral | ObjectLiteral[],
        parameters?: ObjectLiteral,
    ) {
        return await this.query.where(where, parameters).getOne();
    }
    // 查询多条数据
    async findMany(
        where?: string | ((qb: this) => string) | Brackets | ObjectLiteral | ObjectLiteral[],
        parameters?: ObjectLiteral,
    ) {
        return await this.query.where(where, parameters).getMany();
    }
    // 查询分页数据
    async findPagination(
        where?: string | ((qb: this) => string) | Brackets | ObjectLiteral | ObjectLiteral[],
        parameters?: ObjectLiteral,
        skip?: number,
        take?: number,
    ) {
        return await this.query.where(where, parameters).skip(skip).take(take).getMany();
    }

    // 添加数据
    async insert(values: QueryDeepPartialEntity<Entity> | QueryDeepPartialEntity<Entity>[]) {
        return await this.query.insert().values(values).execute();
    }
    // 更新数据
    async update(
        values: QueryDeepPartialEntity<Entity>,
        where: string | ((qb: this) => string) | Brackets | ObjectLiteral | ObjectLiteral[],
        parameters?: ObjectLiteral,
    ) {
        return await this.query.update().set(values).where(where, parameters).execute();
    }
    // 删除数据
    async delete(
        where: string | ((qb: this) => string) | Brackets | ObjectLiteral | ObjectLiteral[],
        parameters?: ObjectLiteral,
    ) {
        return await this.query.delete().where(where, parameters).execute();
    }
}
