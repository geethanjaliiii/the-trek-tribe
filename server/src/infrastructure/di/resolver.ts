import { container } from "tsyringe";
import { DependencyInjection } from ".";

import { SendEmailController } from "../../interface-adapters/controllers/auth/send-email.controller";
import { VerifyOTPController } from "../../interface-adapters/controllers/auth/verify-otp.controller";
import { RegisterUserController } from "../../interface-adapters/controllers/auth/register.controller";

DependencyInjection.registerAll();

export const sendEmailController = container.resolve(SendEmailController)

export const verifyOTPController =container.resolve(VerifyOTPController);

export const regsiterUserController = container.resolve(RegisterUserController)