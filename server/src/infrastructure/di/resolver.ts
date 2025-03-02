import { container } from "tsyringe";
import { DependencyInjection } from ".";

import { SendEmailController } from "../../interface-adapters/controllers/auth/send-email.controller";
import { VerifyOTPController } from "../../interface-adapters/controllers/auth/verify-otp.controller";

DependencyInjection.registerAll();

export const sendEmailController = container.resolve(SendEmailController)

export const verifyOTPController =container.resolve(VerifyOTPController);