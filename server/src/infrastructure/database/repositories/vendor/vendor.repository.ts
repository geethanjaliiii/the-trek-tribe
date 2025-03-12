import { injectable } from "tsyringe";
import { IVendor } from "../../../../domain/entities/vendor.entity";
import { IVendorRepository } from "../../../../domain/repositories/vendor/vendorRepository.interface";
import { VendorModel } from "../../models/vendor.model";
import { ObjectId } from "mongoose";

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
    async findById(id: ObjectId): Promise<IVendor | null> {
      return await VendorModel.findById(id);
    }
   async findByEmail(email: string): Promise<IVendor | null> {
        return await VendorModel.findOne({email})
    }
   async findByIdAndUpdatePassword(id: ObjectId, password: string): Promise<void> {
         await VendorModel.findByIdAndUpdate(id,{password});
    }
   async updateVendorProfileById(id: ObjectId, data: Partial<IVendor>): Promise<void> {
        await VendorModel.findByIdAndUpdate(id,{$set: data})
    }
    async findByIdAndUpdateStatus(id: any, status: string): Promise<void> {
        await VendorModel.findByIdAndUpdate(id, {
          $set: {
            status: status,
          },
        });
      }
}