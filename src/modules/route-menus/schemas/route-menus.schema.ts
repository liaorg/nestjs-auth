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
