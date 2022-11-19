import { UserError } from "@/common/constants";
import { QueryParamDecorator } from "@/common/decorators/query.param.decorator";
import { appConfig } from "@/config";
import { AuthService } from "@/modules/shared/auth/auth.service";
import { GuestDecorator, RequestUserDecorator } from "@/modules/shared/auth/decorators";
import { RequestUserDto } from "@/modules/shared/auth/dto";
import { LocalAuthGuard } from "@/modules/shared/auth/guards";
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Query,
    Req,
    UseGuards,
} from "@nestjs/common";
import { ApiBody, ApiOperation, ApiQuery, ApiTags } from "@nestjs/swagger";
import { I18n, I18nContext } from "nestjs-i18n";
import { ObjectLiteral } from "typeorm";
import {
    CreateUserDto,
    DeleteUserDto,
    LoginDto,
    QueryParamDto,
    QueryUserDto,
    ResetPasswordDto,
    UpdatePasswordDto,
    UpdateProfileDto,
    UpdateUserDto,
    UserDto,
    UserListDto,
    UserProfileDto,
} from "./dto";
import { UserException } from "./user.exception";
import { UserService } from "./user.service";

// 抛出 400类(客户端错误)异常 500类(服务器错误)异常

@ApiTags("用户管理")
@Controller(`${appConfig.adminPrefix}user`)
// 根据 UserDto 转换和净化数据，转换和净化输出的数据
// @ObjectSerializerDtoDecorator(UserDto)
// @UseInterceptors(ObjectSerializerInterceptor)
export class UserController {
    constructor(private readonly service: UserService, private readonly authService: AuthService) {}
    /**
     * 登录
     * @param user
     * @returns
     */
    @ApiOperation({ summary: "登录" })
    @Post("login")
    // 设置不验证 jwt
    @GuestDecorator()
    @UseGuards(LocalAuthGuard)
    @ApiBody({ type: LoginDto })
    async login(@RequestUserDecorator() user: RequestUserDto) {
        return await this.authService.createToken(user);
    }

    /**
     * 注销登录
     * @param req
     * @returns
     */
    @ApiOperation({ summary: "注销登录" })
    @Get("logout")
    async logout(@Req() req: any) {
        return await this.authService.logout(req);
    }

    @ApiOperation({ summary: "用户列表-分页查询" })
    @Get()
    async findAll(@Query() query: QueryUserDto, @I18n() i18n: I18nContext): Promise<UserListDto> {
        const { page, limit, name, roleId, status } = query;
        const where: ObjectLiteral = {};
        if (name) {
            where.name = name;
        }
        if (roleId) {
            where.roleId = roleId;
        }
        if (status === 0 || status === 1) {
            where.status = status;
        }
        const [total, userList] = await this.service.findAll(page, limit, where);
        const list = [];
        // 数据重组
        userList &&
            userList.forEach((value) => {
                list.push({
                    id: value.user_id,
                    name: value.user_name,
                    roleId: value.role_id,
                    roleName: value.role_local ? i18n.t(value.role_local) : value.role_name,
                    status: value.user_status,
                    isDefault: value.is_default,
                    description: value.user_description,
                });
            });
        return { list, limit, total };
    }

    @ApiOperation({ summary: "添加用户" })
    @Post()
    async create(@Body() post: CreateUserDto) {
        const user = await this.service.create(post);
        if (!user) {
            const error = {
                ...UserError.addFailed,
            };
            throw new UserException(error);
        }
        return true;
    }

    @ApiOperation({ summary: "获取指定用户信息(包含角色)-用户管理" })
    @Get(":id")
    async findUserInfo(
        @Param("id", ParseIntPipe) id: number,
        @I18n() i18n: I18nContext,
    ): Promise<UserDto> {
        const user = await this.service.findUserInfo(id);
        if (!user) {
            const error = {
                ...UserError.notExisted,
                args: { id },
            };
            throw new UserException(error);
        }
        const userInfo = {
            id: user.user_id,
            name: user.user_name,
            roleId: user.role_id,
            roleName: user.role_local ? i18n.t(user.role_local) : user.role_name,
            status: user.user_status,
            description: user.user_description,
            meta: {
                email: user.user_email,
                // 真实姓名
                fullName: user.user_full_name,
                // 性别：0-未知|1-男|2-女
                gender: user.user_gender,
                // 部门
                department: user.user_department,
                // 职务
                duty: user.user_duty,
                // 身份证号
                idNumber: user.user_id_number,
                // 手机号
                phoneNumber: user.user_phone_number,
                // QQ
                qq: user.user_qq,
            },
        };
        return userInfo;
    }

    @ApiOperation({ summary: "修改用户" })
    @Patch(":id")
    async update(@Param("id", ParseIntPipe) id: number, @Body() post: UpdateUserDto) {
        const user = await this.service.updateById(id, post);
        if (!user) {
            const error = {
                ...UserError.updateFailed,
            };
            throw new UserException(error);
        }
        return true;
    }

    @ApiOperation({ summary: "删除单个用户" })
    @Delete(":id")
    async remove(
        @Param("id", ParseIntPipe) id: number,
        @RequestUserDecorator() loginUser: RequestUserDto,
    ) {
        const loginUserId = loginUser.id;
        const deleted = await this.service.removeUser(id, loginUserId);
        if (deleted === false) {
            const error = {
                ...UserError.deleteFailed,
            };
            throw new UserException(error);
        }
        return true;
    }

    @ApiOperation({ summary: '批量删除用户, ?param=base64(json({"id":[103,102]}))' })
    @ApiQuery({ type: QueryParamDto })
    @Delete()
    // QueryParamDecorator 为获取query请求?param=base64(json({"id":[103,102]}))参数
    async removeByIds(
        @QueryParamDecorator() deleteUser: DeleteUserDto,
        @RequestUserDecorator() loginUser: RequestUserDto,
    ) {
        const ids = deleteUser.id;
        const loginUserId = loginUser.id;
        const deleted = await this.service.removeByIds(ids, loginUserId);
        if (deleted === false) {
            const error = {
                ...UserError.deleteFailed,
            };
            throw new UserException(error);
        }
        return true;
    }

    @ApiOperation({ summary: "修改密码" })
    @Patch("password/:id")
    async updatePassword(@Param("id", ParseIntPipe) id: number, @Body() post: UpdatePasswordDto) {
        const user = await this.service.updateById(id, post);
        if (!user) {
            const error = {
                ...UserError.updatePasswordFailed,
            };
            throw new UserException(error);
        }
        return true;
    }

    @ApiOperation({ summary: "重置密码" })
    @Patch("passwords")
    async resetPassword(@Body() post: ResetPasswordDto) {
        const { id: ids, password } = post;
        const updateUser = { password };
        const updated = await this.service.resetPasswordByIds(ids, updateUser);
        if (updated === false) {
            const error = {
                ...UserError.resetPasswordFailed,
            };
            throw new UserException(error);
        }
        return true;
    }

    @ApiOperation({ summary: "获取登录用户信息-头部" })
    @Get("profile")
    async findProfile(@RequestUserDecorator() loginUser: RequestUserDto): Promise<UserProfileDto> {
        const id = loginUser.id;
        const user = await this.service.findOne(id);
        // entity转为dto
        const userInfo = this.service.entity2dto(user, new UserProfileDto());
        return userInfo as UserProfileDto;
    }

    @ApiOperation({ summary: "修改登录用户信息-头部" })
    @Patch("profile")
    async updateProfile(
        @Body() post: UpdateProfileDto,
        @RequestUserDecorator() loginUser: RequestUserDto,
    ) {
        const id = loginUser.id;
        const user = await this.service.updateById(id, post);
        if (!user) {
            const error = {
                ...UserError.updateFailed,
            };
            throw new UserException(error);
        }
        return true;
    }
}
