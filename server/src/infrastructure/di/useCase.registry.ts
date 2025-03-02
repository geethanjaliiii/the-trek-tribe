import { container } from "tsyringe";
import { IRegisterUserUseCase } from "../../usecases/interface/auth/IRegisterUserUseCase.interface";
import { RegisterUserUseCase } from "../../usecases/auth/register-user.usecase";

import { IBcrypt } from "../security/interface/bcrypt.interface";
import { OTPBcrypt } from "../security/otp.bcrypt";
import { PasswordBcrypt } from "../security/password.bcrypt";

import { IEmailService } from "../services/email/IEmailService.interface";
import { EmailService } from "../services/email/emailService";
import { IOTPService } from "../services/otp/IOTPService.interface";
import { OTPService } from "../services/otp/OTPService";
import { IVerifyOTPUseCase } from "../../usecases/interface/auth/IVerifyOTPUseCase.interface";
import { VerifyOTPUseCase } from "../../usecases/auth/verify-otp.useCase";
import { IRegisterStrategy } from "../../usecases/interface/auth/IRegisterStrategy.interface";
import { ClientRegisterStrategy } from "../../usecases/auth/register-strategies/client-register.stategy";
import { AdminRegisterStrategy } from "../../usecases/auth/register-strategies/admin-register.stategy";
import { VendorRegisterStrategy } from "../../usecases/auth/register-strategies/vendor-register.stategy";

export class UseCaseRegistry {
    static registerUseCases(): void {
        container.register<IRegisterUserUseCase>("IRegisterUserUseCase",{
            useClass: RegisterUserUseCase
        });

        container.register<IVerifyOTPUseCase>("IVerifyOTPUseCase", {
            useClass: VerifyOTPUseCase
        });

        container.register<IBcrypt>('IOTPBcrypt',{
            useClass: OTPBcrypt
        });

        container.register<IBcrypt>("IPasswordBcrypt", {
            useClass: PasswordBcrypt
        })

        container.register<IEmailService>("IEmailService", {
            useClass: EmailService
        });

        container.register<IOTPService>("IOTPService",{
            useClass: OTPService
        })

        container.register<IRegisterStrategy>("ClientRegisterStrategy",{
            useClass: ClientRegisterStrategy
        });

        container.register<IRegisterStrategy>("VendorRegisterStrategy",{
            useClass: VendorRegisterStrategy
        });

        container.register<IRegisterStrategy>("AdminRegisterStrategy",{
            useClass: AdminRegisterStrategy
        })

    }
}