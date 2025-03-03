import { inject, injectable } from "tsyringe";
import { ICheckUserExistanceService } from "./ICheckUserExistance.interface";
import { IClientRepository } from "../../../domain/repositories/client/clientRepository.interface";
import { IVendorRepository } from "../../../domain/repositories/vendor/vendorRepository.interface";
import { IAdminRepository } from "../../../domain/repositories/admin/adminRepository.interface";

@injectable()
export class CheckUserExistance implements ICheckUserExistanceService {

    constructor(
        @inject("IClientRepository") private clientRepo: IClientRepository,
        @inject("IVendorRepository") private vendorRepo: IVendorRepository,
        @inject("IAdminRepository") private adminRepo: IAdminRepository,
    ){}
   async emailExist(email: string): Promise<boolean> {
       const [client, vendor, admin] = await Promise.all([
        this.clientRepo.findByEmail(email),
        this.vendorRepo.findByEmail(email),
        this.adminRepo.findByEmail(email)
       ]);

       return Boolean(client || vendor || admin)
    }

}