import { SetMetadata } from "@nestjs/common";
import { IS_PUBLIC_KEY } from "../constants";

/**
 * 自定义装饰器用于给设置是否要验证 token
 * 使用：
 * 在类或方法使用装饰器
 * @PublicDecorator()
 */
export const PublicDecorator = () => SetMetadata(IS_PUBLIC_KEY, true);
