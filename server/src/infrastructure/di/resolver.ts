import { container } from "tsyringe";
import { DependencyInjection } from ".";

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
import { ForgetPasswordController } from "../../interface-adapters/controllers/auth/forget-password.controller";
import { ResetPasswordController } from "../../interface-adapters/controllers/auth/reset-password.controller";

DependencyInjection.registerAll();

export const sendEmailController = container.resolve(SendEmailController)

export const verifyOTPController =container.resolve(VerifyOTPController);

export const regsiterUserController = container.resolve(RegisterUserController);

export const loginUserController = container.resolve(LoginController)

export const requestVerificationController = container.resolve(RequestVerificationController);

export const getAllUsersController = container.resolve(GetAllUsersController);

export const refreshTokenController = container.resolve(RefreshTokenController);

export const changeUserStatusController = container.resolve(ChangeUserStatusController);

export const googleController = container.resolve(GoogleController)

export const getVendorDetailsController = container.resolve(GetVendorDetailsController)
export const forgetPasswordController = container.resolve(ForgetPasswordController)
export const resetPasswordController = container.resolve(ResetPasswordController)