import { RolesErros } from "@/common/constants";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { RolesEntity } from "./entities";
import { RolesException } from "./roles.exception";

@Injectable()
export class RolesService {
    // 引入对应的服务
    constructor(
        // 使用 @InjectRepository() 装饰器注入 存储库
        @InjectRepository(RolesEntity) private repository: Repository<RolesEntity>, // 其他对应的服务 // private readonly menusService: MenusService,
    ) {}

    // /**
    //  * Get Menu Id array
    //  * @param ids
    //  */
    // async getMenuByIds(ids) {
    //     if (ids && ids.length > 0) {
    //         return await this.menusService.whereAllIds(ids);
    //         // async whereInIds(ids: string[]): Promise<MenoInfoDto[]> {
    //         //     return this.module
    //         //     .find({ _id: { $all: ids } })
    //         // }
    //     }
    //     return [];
    // }

    // 创建角色
    async create(createRole: CreateRoleDto): Promise<boolean> {
        // 查询角色名是否已经存在
        const { rolename } = createRole;
        const data = await this.repository.findOneBy({ rolename });
        if (data) {
            const error = {
                ...RolesErros.existedName,
                args: { name: rolename },
            };
            throw new RolesException(error);
        }
        // 查询菜单路由权限是否存在 todo
        // const menus = await this.getMenuByIds(menu);
        // createRole.menu = menus;
        // 查询角色业务权限是否存在 todo
        // 把 dto 转换为 schema
        const newData = new RolesEntity();
        newData.roleTypeId = createRole.roleTypeId;
        newData.rolename = rolename;
        newData.description = createRole.description;
        newData.status = 1;
        // 写入数据库
        return (await this.repository.save(newData)) ? true : false;
    }

    // 查找全部角色
    async findAll() {
        return await this.repository.find();
    }

    // 查询单个角色
    async findOne(id: number) {
        return await this.findById(id);
    }
    /**
     * 根据角色名查找
     * @param rolename
     */
    async findByName(rolename: string) {
        return await this.repository.findOneBy({ rolename });
    }

    // 更新角色
    async update(id: number, updateRole: UpdateRoleDto): Promise<boolean> {
        await this.findById(id);

        // 查询菜单权限是否存在
        // const menus = await this.getMenuByIds(menu);
        // createRole.menu = menus;

        return (await this.repository.update(id, updateRole)) ? true : false;
    }

    // 删除角色
    async remove(id: number): Promise<boolean> {
        await this.findById(id);
        return (await this.repository.delete(id)) ? true : false;
    }

    // 根据 id 查找
    private async findById(id: number) {
        const existed = await this.repository.findOneBy({ id });
        if (!existed) {
            const error = {
                ...RolesErros.notExisted,
                args: { id },
            };
            throw new RolesException(error);
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
