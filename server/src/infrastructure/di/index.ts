import { ControllerRegistry } from "./controller.registry";
import { RepositoryRegisrty } from "./repository.registry";
import { UseCaseRegistry } from "./useCase.registry";

export class DependencyInjection {
    static registerAll(): void {
        UseCaseRegistry.registerUseCases();
        ControllerRegistry.registerControllers();
        RepositoryRegisrty.registerRepositories();
    }
}