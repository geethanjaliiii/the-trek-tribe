import { container } from "tsyringe";
import { DependencyInjection } from ".";
import { RegisterUserController } from "../../interface-adapters/controllers/auth/register.controller";

DependencyInjection.registerAll();

export const registerUserController = container.resolve(RegisterUserController)