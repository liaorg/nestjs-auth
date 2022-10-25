import { Controller, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { GuestDecorator } from "./decorators/guest.decorator";
import { RequestUserDecorator } from "./decorators/request-user.decorator";
import { RequestUserDto } from "./dto";
import { LocalAuthGuard } from "./guards";

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    /**
     * 登录
     * @param user
     * @returns
     */
    @Post("login")
    @GuestDecorator()
    @UseGuards(LocalAuthGuard)
    async login(@RequestUserDecorator() user: RequestUserDto) {
        return await this.authService.createToken(user);
    }

    /**
     * 注销登录
     * @param req
     * @returns
     */
    @Post("logout")
    async logout(@Req() req: any) {
        return await this.authService.logout(req);
    }
}
