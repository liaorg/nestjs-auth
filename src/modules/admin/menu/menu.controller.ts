import { appConfig } from "@/config";
import { Controller } from "@nestjs/common";

@Controller(`${appConfig.adminPrefix}/menu`)
export class MenuController {}
