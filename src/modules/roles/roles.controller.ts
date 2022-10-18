import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { RolesService } from "./roles.service";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { PublicDecorator } from "../auth/decorators";

@ApiTags("角色管理")
@Controller("roles")
export class RolesController {
    constructor(private readonly rolesService: RolesService) {}

    @ApiOperation({ summary: "创建角色" })
    @Post()
    @PublicDecorator()
    create(@Body() createRole: CreateRoleDto) {
        return this.rolesService.create(createRole);
    }

    @Get()
    findAll() {
        return this.rolesService.findAll();
    }

    @Get(":id")
    findOne(@Param("id") id: number) {
        return this.rolesService.findOne(id);
    }

    @Patch(":id")
    update(@Param("id") id: number, @Body() updateRole: UpdateRoleDto) {
        return this.rolesService.update(id, updateRole);
    }

    @Delete(":id")
    remove(@Param("id") id: number) {
        return this.rolesService.remove(id);
    }
}
