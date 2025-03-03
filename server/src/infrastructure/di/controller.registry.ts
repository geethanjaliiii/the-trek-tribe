import { container } from "tsyringe";
import { SendEmailController } from "../../interface-adapters/controllers/auth/send-email.controller";
import { VerifyOTPController } from "../../interface-adapters/controllers/auth/verify-otp.controller";
import { RegisterUserController } from "../../interface-adapters/controllers/auth/register.controller";

export class ControllerRegistry {
    static registerControllers(): void {
        container.register("SendEmailController", {
            useClass: SendEmailController
        })
       
        container.register("VerifyOTPController", {
            useClass: VerifyOTPController
        }),
        container.register("RegisterUserController",{
            useClass: RegisterUserController
        })
        //......
    }
}