import { RequestValidationSchema } from "@/common/decorators";
import { PartialType } from "@nestjs/swagger";
// import { PartialType } from "@nestjs/mapped-types";
import { updateUserSchema } from "../schemas";
import { CreateUserDto } from "./create-user.dto";

@RequestValidationSchema(updateUserSchema)
export class UpdateUserDto extends PartialType(CreateUserDto) {}
