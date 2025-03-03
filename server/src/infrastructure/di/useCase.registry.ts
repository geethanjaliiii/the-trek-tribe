import { container } from "tsyringe";
import { IRegisterUserUseCase } from "../../usecases/interface/auth/IRegisterUserUseCase.interface";
import { RegisterUserUseCase } from "../../usecases/auth/register-user.usecase";

import { IBcrypt } from "../services/security/interface/bcrypt.interface";
import { OTPBcrypt } from "../services/security/otp.bcrypt";
import { PasswordBcrypt } from "../services/security/password.bcrypt";

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
import { ISendEmailUseCase } from "../../usecases/interface/auth/ISendEmailUsecase.interface";
import { SendEmailUsecase } from "../../usecases/auth/send-email.usecase";
import { ICheckUserExistanceService } from "../services/auth/ICheckUserExistance.interface";
import { CheckUserExistance } from "../services/auth/checkUserExistance.service";
import { IGenerateTokenUseCase } from "../../usecases/interface/auth/IGenerateTokenUsecase.interface";
import { GenerateTokenUseCase } from "../../usecases/auth/generate-token.useCase";
import { IJWTService } from "../services/jwt/IJWTService.interface";
import { JWTService } from "../services/jwt/JWTService";

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
        });

        container.register<ISendEmailUseCase>("ISendEmailUseCase",{
            useClass: SendEmailUsecase
        })

        container.register<ICheckUserExistanceService>("ICheckUserExistanceService",{
            useClass: CheckUserExistance
        })

        container.register<IGenerateTokenUseCase>("IGenerateTokenUseCase",{
            useClass: GenerateTokenUseCase
        })

        container.register<IJWTService>("IJWTService",{
            useClass:JWTService
        })

    }
}