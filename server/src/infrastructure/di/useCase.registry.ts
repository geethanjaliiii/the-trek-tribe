import { container } from "tsyringe";
import { IRegisterUserUseCase } from "../../usecases/interface/auth/IRegisterUserUseCase.interface";
import { RegisterUserUseCase } from "../../usecases/auth/register-user.usecase";

import { IBcrypt } from "../security/interface/bcrypt.interface";
import { OTPBcrypt } from "../security/otp.bcrypt";
import { PasswordBcrypt } from "../security/password.bcrypt";

import { IEmailService } from "../services/email/IEmailService.interface";
import { EmailService } from "../services/email/emailService";

export class UseCaseRegistry {
    static registerUseCases(): void {
        container.register<IRegisterUserUseCase>("IRegisterUserUseCase",{
            useClass: RegisterUserUseCase
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

    }
}