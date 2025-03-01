import { container } from "tsyringe";
import { RegisterUserController } from "../../interface-adapters/controllers/auth/register.controller";

export class ControllerRegistry {
    static registerControllers(): void {
        container.register("RegisterUserController", {
            useClass: RegisterUserController
        })

        //......
    }
}