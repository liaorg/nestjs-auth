import { RolesErros } from "@/common/constants";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { RolesException } from "./roles.exception";
import { Roles, RolesDocument } from "./schemas";

@Injectable()
export class RolesService {
    // 引入对应的服务
    constructor(
        // 使用 @InjectModel() 装饰器注入 模型
        @InjectModel(Roles.name) private model: Model<RolesDocument>, // 其他对应的服务 // private readonly menusService: MenusService,
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
        const data = await this.model.findOne({ rolename }).lean();
        if (data) {
            const error = {
                ...RolesErros.existedName,
                args: { name: rolename },
            };
            throw new RolesException(error);
        }
        // 查询菜单权限是否存在
        // const menus = await this.getMenuByIds(menu);
        // createRole.menu = menus;
        // 把 dto 转换为 schema
        const newData = new this.model(createRole);
        // 写入数据库
        return (await newData.save()) ? true : false;
    }

    // 查找全部角色
    async findAll() {
        return await this.model.find().lean();
    }

    // 查询单个角色
    async findOne(id: ObjectId) {
        return await this.findById(id);
    }
    /**
     * 根据角色名查找
     * @param rolename
     */
    async findByName(rolename: string) {
        return await this.model.findOne({ rolename }).lean();
    }

    // 更新角色
    async update(id: ObjectId, updateRole: UpdateRoleDto): Promise<boolean> {
        await this.findById(id);

        // 查询菜单权限是否存在
        // const menus = await this.getMenuByIds(menu);
        // createRole.menu = menus;

        return (await this.model.findByIdAndUpdate(id, updateRole).lean()) ? true : false;
    }

    // 删除角色
    async remove(id: ObjectId): Promise<boolean> {
        await this.findById(id);
        return (await this.model.findByIdAndDelete(id).lean()) ? true : false;
    }

    // 根据 id 查找
    private async findById(id: ObjectId | string) {
        const existed = await this.model.findById(id).lean();
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
