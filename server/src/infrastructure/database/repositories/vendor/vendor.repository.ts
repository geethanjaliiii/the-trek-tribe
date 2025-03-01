import { injectable } from "tsyringe";
import { IVendor } from "../../../../domain/entities/vendor.entity";
import { IVendorRepository } from "../../../../domain/repositories/vendor/vendorRepository.interface";
import { VendorModel } from "../../models/vendor.model";

@injectable()
export class VendorRepository implements IVendorRepository{
   async save(data: Partial<IVendor>): Promise<IVendor> {
       return await VendorModel.create(data);
    }
   async find(filter: object, skip: number, limit: number): Promise<{ user: IVendor[] | []; total: number; }> {
       const [user, total]=await Promise.all([
        VendorModel.find(filter).sort({createdAt:-1}).skip(skip).limit(limit),
        VendorModel.countDocuments(filter)
       ]) 
       return {user, total}
    }
    async findById(id: string): Promise<IVendor | null> {
      return await VendorModel.findById(id);
    }
   async findByEmail(email: string): Promise<IVendor | null> {
        return await VendorModel.findOne({email})
    }
   async findByIdAndUpdatePassword(id: string, password: string): Promise<void> {
         await VendorModel.findByIdAndUpdate(id,{password});
    }
   async updateVendorProfileById(id: string, data: Partial<IVendor>): Promise<void> {
        await VendorModel.findByIdAndUpdate(id,{$set: data})
    }

}