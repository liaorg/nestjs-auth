import { Module } from "@nestjs/common";
import { RolesService } from "./roles.service";
import { RolesController } from "./roles.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RolesEntity } from "./entities";

@Module({
    imports: [TypeOrmModule.forFeature([RolesEntity], "authConnection")],
    exports: [],
    controllers: [RolesController],
    providers: [RolesService],
})
export class RolesModule {}
