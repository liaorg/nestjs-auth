import { PartialType } from "@nestjs/swagger";
import { CreateRouteMenuDto } from "./create-route-menu.dto";

export class UpdateRouteMenuDto extends PartialType(CreateRouteMenuDto) {}
