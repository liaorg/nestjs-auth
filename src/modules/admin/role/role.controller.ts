import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { RoleService } from "./role.service";
import { PublicDecorator } from "@/modules/shared/auth/decorators";
import { appConfig } from "@/config";
import { I18n, I18nContext } from "nestjs-i18n";

@ApiTags("角色管理")
@Controller(`${appConfig.adminPrefix}role`)
export class RoleController {
    constructor(private readonly service: RoleService) {}

    @ApiOperation({ summary: "获取角色下拉列表" })
    @Get("list")
    async findList(@I18n() i18n: I18nContext) {
        const roleList = await this.service.findList();
        const list = [];
        roleList &&
            roleList.forEach((value) => {
                list.push({
                    id: value.id,
                    name: value.local ? i18n.t(value.local) : value.name,
                });
            });
        return list;
    }

    @ApiOperation({ summary: "创建角色" })
    @Post()
    @PublicDecorator()
    create(@Body() createRole: CreateRoleDto) {
        return this.service.create(createRole);
    }

    @Get(":id")
    findOne(@Param("id") id: number) {
        return this.service.findOne(id);
    }

    @Patch(":id")
    update(@Param("id") id: number, @Body() updateRole: UpdateRoleDto) {
        return this.service.updateById(id, updateRole);
    }

    @Delete(":id")
    remove(@Param("id") id: number) {
        return this.service.remove(id);
    }
}
