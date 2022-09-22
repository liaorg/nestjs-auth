import { Test, TestingModule } from "@nestjs/testing";
import { RouteMenusService } from "./route-menus.service";

describe("RoutesService", () => {
    let service: RouteMenusService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [RouteMenusService],
        }).compile();

        service = module.get<RouteMenusService>(RouteMenusService);
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });
});
