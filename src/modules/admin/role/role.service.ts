import { RoleError } from "@/common/constants";
import { DbBaseService } from "@/common/services";
import { Injectable } from "@nestjs/common";
import { DataSource, ObjectLiteral } from "typeorm";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { RoleEntity } from "./entities";
import { RoleException } from "./role.exception";

@Injectable()
export class RoleService extends DbBaseService<RoleEntity> {
    constructor(protected dataSource: DataSource) {
        super(dataSource, RoleEntity, "role");
    }
    // 获取角色下拉列表
    async findList() {
        const query = this.createQueryBuilder();
        const status = 1;
        return await query.select(["id", "name", "local"]).where({ status }).getRawMany();
    }

    // 创建角色
    async create(createRole: CreateRoleDto): Promise<boolean> {
        // 查询角色名是否已经存在
        const { name } = createRole;
        const data = await this.findOneBy({ name });
        if (data) {
            const error = {
                ...RoleError.existedName,
                args: { name },
            };
            throw new RoleException(error);
        }
        // 查询菜单路由权限是否存在 todo
        // const menus = await this.getMenuByIds(menu);
        // createRole.menu = menus;
        // 查询角色业务权限是否存在 todo
        // 把 dto 转换为 schema
        const newData = new RoleEntity();
        newData.name = name;
        newData.description = createRole.description;
        newData.status = 1;
        // 写入数据库
        return (await this.insert(newData)) ? true : false;
    }

    // 查询单个角色
    async findOne(id: number) {
        return await this.findById(id, 1);
    }
    /**
     * 根据角色名查找
     * @param rolename
     */
    async findByName(rolename: string) {
        return await this.findOneBy({ name: rolename });
    }

    // 更新角色
    async updateById(id: number, updateRole: UpdateRoleDto): Promise<boolean> {
        await this.findById(id);

        // 查询菜单权限是否存在
        // const menus = await this.getMenuByIds(menu);
        // createRole.menu = menus;

        return (await this.update({ id }, updateRole)) ? true : false;
    }

    // 删除角色
    async remove(id: number): Promise<boolean> {
        await this.findById(id);
        return (await this.delete({ id })) ? true : false;
    }

    // 根据 id 查找
    private async findById(id: number, status?: number) {
        const where: ObjectLiteral = { id };
        if (status) {
            where.status = status;
        }
        const existed = await this.findOneBy(where);
        if (!existed) {
            const error = {
                ...RoleError.notExisted,
                args: { id },
            };
            throw new RoleException(error);
        }
        return existed;
    }

    // /**
    //  * transform single role
    //  * @param model
    //  * @param transformOption
    //  */
    // transform(model: RoleEntity, transformOption = {}): RoleSerializer {
    //     return plainToClass(RoleSerializer, classToPlain(model, transformOption), transformOption);
    // }

    // /**
    //  * transform array of roles
    //  * @param models
    //  * @param transformOption
    //  */
    // transformMany(models: RoleEntity[], transformOption = {}): RoleSerializer[] {
    //     return models.map((model) => this.transform(model, transformOption));
    // }
}
