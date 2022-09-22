/**
 * 路由操作权限
 * 对应的http操作方法：post|patch|delete|get
 * @value 1 POST
 * @value 2 PATCH
 * @value 3 DELETE
 * @value 4 GET
 */
export enum RoutePermission {
    POST = 1,
    PATCH = 2,
    DELETE = 3,
    GET = 4,
}
