import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RoutesEntity } from "./entities";
import { RoutesService } from "./routes.service";

@Module({
    imports: [TypeOrmModule.forFeature([RoutesEntity], "authConnection")],
    // 路由管理不对外开放路由
    // controllers: [RoutesController],
    providers: [RoutesService],
})
export class RoutesModule {}
