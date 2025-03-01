import { container } from "tsyringe";
import { IAdminRepository } from "../../domain/repositories/admin/adminRepository.interface";
import { AdminRepository } from "../database/repositories/admin/admin.repository";
import { IClientRepository } from "../../domain/repositories/client/clientRepository.interface";
import { ClientRepository } from "../database/repositories/client/client.repository";
import { IVendorRepository } from "../../domain/repositories/vendor/vendorRepository.interface";
import { VendorRepository } from "../database/repositories/vendor/vendor.repository";
export class RepositoryRegisrty {
    static registerRepositories(): void {
        container.register<IAdminRepository>("IAdminRepository", {
            useClass: AdminRepository
        })

        container.register<IClientRepository>("IClientRepository",{
            useClass:ClientRepository
        })

        container.register<IVendorRepository>("IVendorRepository",{
            useClass: VendorRepository
        })

      
    }
}