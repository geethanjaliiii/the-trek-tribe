import { IAdmin } from "../../../../domain/entities/admin.entity";
import { IAdminRepository } from "../../../../domain/repositories/admin/adminRepository.interface";
import { AdminModel } from "../../models/admin.model";

export class AdminRepository implements IAdminRepository {
  async  save(data: Partial<IAdmin>): Promise<IAdmin> {
        return await AdminModel.create(data)
    }
   async findByEmail(email: string): Promise<IAdmin | null> {
        return await AdminModel.findOne({email})
    }

}