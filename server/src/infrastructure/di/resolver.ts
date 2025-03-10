import { container } from "tsyringe";
import { DependencyInjection } from ".";

import { SendEmailController } from "../../interface-adapters/controllers/auth/send-email.controller";
import { VerifyOTPController } from "../../interface-adapters/controllers/auth/verify-otp.controller";
import { RegisterUserController } from "../../interface-adapters/controllers/auth/register.controller";
import { LoginController } from "../../interface-adapters/controllers/auth/login.controller";
import { RequestVerificationController } from "../../interface-adapters/controllers/verificationRequest/request-vendor-verification.controller";

DependencyInjection.registerAll();

export const sendEmailController = container.resolve(SendEmailController)

export const verifyOTPController =container.resolve(VerifyOTPController);

export const regsiterUserController = container.resolve(RegisterUserController);

export const loginUserController = container.resolve(LoginController)

export const requestVerificationController = container.resolve(RequestVerificationController);