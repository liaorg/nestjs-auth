import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { BaseRouteMenusDocument } from "./base-route-menus.schema";
import { RouteMenusChildren, RouteMenusChildrenSchema } from "./route-menus-children.schema";
import { SubActions, SubActionsSchema } from "./sub-actions.schema";

// 主模块菜单 RouteMenus
// 模块二级菜单 children
// 三级菜单 sonmenus
// 四级菜单 submenus
// 子菜单操作 subactions
// {
//     route: "/sys",
//     menuname: "routes.sys",
//     role: ["systemAdmin"],
//     permission: ["post", "delete", "patch", "get"],
//     // 二级菜单
//     children: [
//         {
//             route: "/sys/son",
//             menuname: "routes.sys.son",
//             role: ["systemAdmin"],
//             permission: ["post", "delete", "patch", "get"],
//             // 三级菜单
//             sonmenus: [
//                 {
//                     route: "/sys/son/sub",
//                     menuname: "routes.sys",
//                     role: ["systemAdmin"],
//                     permission: ["post", "delete", "patch", "get"],
//                     // 四级菜单
//                     submenus: [
//                         {
//                             route: "/sys/son/sub/sub1",
//                             menuname: "routes.sys",
//                             role: ["systemAdmin"],
//                             permission: ["post", "delete", "patch", "get"],
//                             // 子菜单操作
//                             subactions: [
//                                  {
//                                        route: "/sys/son/sub/sub1/act",
//                                        menuname: "routes.sys",
//                                        role: ["systemAdmin"],
//                                        permission: ["post", "delete", "patch", "get"],
//                                 }
//                             ]
//                         }
//                     ],
//                     // 子菜单操作
//                     subactions: [...]
//                 }
//             ],
//             // 子菜单操作
//             subactions: [...]
//         }
//     ]
// }

export type RouteMenusDocument = RouteMenus & BaseRouteMenusDocument;
// 连接表名
// 定义主模块
@Schema({ collection: "route_menus" })
export class RouteMenus extends BaseRouteMenusDocument {
    // 子文档-下一级路由菜单
    @Prop({ type: [RouteMenusChildrenSchema] })
    children: RouteMenusChildren[];
    // 子文档-子菜单操作
    @Prop({ type: [SubActionsSchema] })
    subactions: SubActions[];
}

export const RouteMenusSchema = SchemaFactory.createForClass(RouteMenus);
