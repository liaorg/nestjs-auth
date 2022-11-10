import { SetMetadata } from "@nestjs/common";
import { ALLOW_GUEST } from "../constants";

/**
 * 自定义装饰器用于给设置是否要验证 token
 * 使用：
 * 在类或方法使用装饰器
 * @GuestDecorator()
 */
export const GuestDecorator = () => SetMetadata(ALLOW_GUEST, true);
