import { OperateEnum } from "@/modules/shared/permission/enums/operate.enum";

// http 方法 OperateEnum
export const operateMethod = ["*", "GET", "POST", "DELETE", "PATCH", "PUT", "HEAD"];

// 操作表
export const defaultOperate = [
    { id: OperateEnum.ALL, method: "*" },
    { id: OperateEnum.GET, method: "GET" },
    { id: OperateEnum.POST, method: "POST" },
    { id: OperateEnum.DELETE, method: "DELETE" },
    { id: OperateEnum.PATCH, method: "PATCH" },
    { id: OperateEnum.PUT, method: "PUT" },
    { id: OperateEnum.HEAD, method: "HEAD" },
];
