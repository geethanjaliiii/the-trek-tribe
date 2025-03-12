import { container } from "tsyringe";
import { SendEmailController } from "../../interface-adapters/controllers/auth/send-email.controller";
import { VerifyOTPController } from "../../interface-adapters/controllers/auth/verify-otp.controller";
import { RegisterUserController } from "../../interface-adapters/controllers/auth/register.controller";
import { LoginController } from "../../interface-adapters/controllers/auth/login.controller";
import { RequestVerificationController } from "../../interface-adapters/controllers/verificationRequest/request-vendor-verification.controller";
import { GetAllUsersController } from "../../interface-adapters/controllers/admin/get-all-users.controller";
import { RefreshTokenController } from "../../interface-adapters/controllers/auth/refresh-token.controller";
import { ChangeUserStatusController } from "../../interface-adapters/controllers/admin/change-user-status.controller";
import { GoogleController } from "../../interface-adapters/controllers/auth/google.controller";
import { GetVendorDetailsController } from "../../interface-adapters/controllers/vendor/get-vendor-details.controller";

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
        container.register("LoginController", {
            useClass:LoginController
        })
        container.register('RequestVerificationController',{
            useClass:RequestVerificationController
        });

        container.register("GetAllUsersController",{
            useClass:GetAllUsersController
        });

        container.register("RefreshTokenController",{
            useClass:RefreshTokenController
        })
        container.register("ChangeUserStatusController",{
            useClass:ChangeUserStatusController
        })
        container.register("GoogleController",{
            useClass:GoogleController
        })
        container.register("GetVendorDetailsController",{
            useClass:GetVendorDetailsController
        })
        //......
    }
}