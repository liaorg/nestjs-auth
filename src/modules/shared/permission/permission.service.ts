import { Injectable } from "@nestjs/common";

@Injectable()
export class PermissionService {
    findAll() {
        return `This action returns all permission`;
    }

    findOne(id: number) {
        return `This action returns a #${id} permission`;
    }

    // update(id: number, updatePermissionDto: UpdatePermissionDto) {
    //     return `This action updates a #${id} permission`;
    // }

    remove(id: number) {
        return `This action removes a #${id} permission`;
    }
}
