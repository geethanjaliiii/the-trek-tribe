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
import { ILoginStrategy } from "../../usecases/interface/auth/ILoginStrategy.interface";
import { AdminLoginStrategy } from "../../usecases/auth/login-strategies/admin-login.strategy";
import { VendorLoginStrategy } from "../../usecases/auth/login-strategies/vendor-login.strategy"; 
import { kMaxLength } from "buffer";
import { ClientLoginStrategy } from "../../usecases/auth/login-strategies/client-login.strategy"; 
import { LoginUserUseCase } from "../../usecases/auth/login-user.usecase";
import { ILoginUserUseCase } from "../../usecases/interface/auth/ILoginUserUsecase.interface";
import { IRequestVerificationUsecase } from "../../usecases/interface/vendor/IVerify-vendor-Usecase.interface";
import { RequestVerificationUseCase } from "../../usecases/verificationRequest/verify-vendor.usecase";
import { IGetAllUserUsecase } from "../../usecases/interface/admin/IGetAllUserUsecase.interface";
import { GetAllUserUseCase } from "../../usecases/admin/get-all-users.usecase";
import { IRefrshTokenUsecase } from "../../usecases/interface/auth/IRefreshTokenUseCase";
import { RefreshTokenUsecase } from "../../usecases/auth/refreshToken.usecase";
import { IChangeUserStatusUsecase } from "../../usecases/interface/admin/IChangeUserStatusUsecase.interface";
import { ChangeUserStatusUseCase } from "../../usecases/admin/change-user-status.usecase";
import { ClientGoogleLoginStrategy } from "../../usecases/auth/login-strategies/client-google-login.strategy";
import { VendorGoogleLoginStrategy } from "../../usecases/auth/login-strategies/vendor-googlr-login.strategy";
import { IGoogleUseCase } from "../../usecases/interface/auth/IGoogleUsecase.interface";
import { GoogleUsecase } from "../../usecases/auth/google.usecase";
import { IGetVendorDetailsUsecase } from "../../usecases/interface/vendor/IGetVendorDetails";
import { GetVendorDetailsUsecase } from "../../usecases/vendor/GetVendorDetails.usecase";

export class UseCaseRegistry {
    static registerUseCases(): void {
        container.register<IRegisterUserUseCase>("IRegisterUserUseCase",{
            useClass: RegisterUserUseCase
        });

        container.register<IVerifyOTPUseCase>("IVerifyOTPUseCase", {
            useClass: VerifyOTPUseCase
        });

        container.register<ILoginUserUseCase>("ILoginUserUseCase",{
            useClass: LoginUserUseCase
        })

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
       
        container.register<ILoginStrategy>("AdminLoginStrategy",{
            useClass: AdminLoginStrategy
        });

        container.register<ILoginStrategy>('VendorLoginStrategy',{
            useClass:VendorLoginStrategy
        });

        container.register<ILoginStrategy>("ClientLoginStrategy",{
            useClass:ClientLoginStrategy
        });

        container.register<ILoginUserUseCase>("ILoginUserUseCase",{
            useClass:LoginUserUseCase
        });

        container.register<IRequestVerificationUsecase>("IRequestVerificationUsecase",{
            useClass:RequestVerificationUseCase
        });

        container.register<IGetAllUserUsecase>("IGetAllUserUsecase",{
            useClass:GetAllUserUseCase
        });

        container.register<IRefrshTokenUsecase>("IRefrshTokenUsecase",{
            useClass:RefreshTokenUsecase
        })
        container.register<IChangeUserStatusUsecase>("IChangeUserStatusUsecase",{
            useClass:ChangeUserStatusUseCase
        })
        container.register<ILoginStrategy>("ClientGoogleLoginStrategy",{
            useClass:ClientGoogleLoginStrategy
        })
        container.register<ILoginStrategy>("VendorGoogleLoginStrategy",{
            useClass:VendorGoogleLoginStrategy
        })
        container.register<IGoogleUseCase>(
            'IGoogleUseCase',{
                useClass:GoogleUsecase
            }
        )
        container.register<IGetVendorDetailsUsecase>(
            'IGetVendorDetailsUsecase',{
                useClass:GetVendorDetailsUsecase
            }
        )

    }
}