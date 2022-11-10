import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { RoleService } from "./role.service";
import { PublicDecorator } from "@/modules/shared/auth/decorators";

@ApiTags("角色管理")
@Controller("role")
export class RoleController {
    constructor(private readonly service: RoleService) {}

    @ApiOperation({ summary: "创建角色" })
    @Post()
    @PublicDecorator()
    create(@Body() createRole: CreateRoleDto) {
        return this.service.create(createRole);
    }

    @Get()
    findAll() {
        return this.service.findAll();
    }

    @Get(":id")
    findOne(@Param("id") id: number) {
        return this.service.findOne(id);
    }

    @Patch(":id")
    update(@Param("id") id: number, @Body() updateRole: UpdateRoleDto) {
        return this.service.update(id, updateRole);
    }

    @Delete(":id")
    remove(@Param("id") id: number) {
        return this.service.remove(id);
    }
}