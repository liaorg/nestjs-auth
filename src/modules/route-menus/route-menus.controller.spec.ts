import { Test, TestingModule } from "@nestjs/testing";
import { RouteMenusController } from "./route-menus.controller";
import { RouteMenusService } from "./route-menus.service";

describe("RouteMenusController", () => {
    let controller: RouteMenusController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [RouteMenusController],
            providers: [RouteMenusService],
        }).compile();

        controller = module.get<RouteMenusController>(RouteMenusController);
    });

    it("should be defined", () => {
        expect(controller).toBeDefined();
    });
});
