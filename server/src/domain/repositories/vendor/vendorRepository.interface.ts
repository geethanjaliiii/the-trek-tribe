import { ObjectId } from "mongoose";
import { IVendor } from "../../entities/vendor.entity";

export interface IVendorRepository {
  save(data: Partial<IVendor>): Promise<IVendor>;

  find(
    filter: unknown,
    skip: number,
    limit: number
  ): Promise<{ user: IVendor[] | []; total: number }>;
  
  findById(id: ObjectId): Promise<IVendor | null>;
  
  findByEmail(email: string): Promise<IVendor | null>;
  
  findByIdAndUpdatePassword(id: ObjectId, password: string): Promise<void>;
  
  updateVendorProfileById(
    id: ObjectId,
    data: Partial<IVendor>
  ): Promise<void>;
 findByIdAndUpdateStatus(id: any, status: string): Promise<void> 
}
