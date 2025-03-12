import { inject, injectable } from "tsyringe";
import { IChangeUserStatusUsecase } from "../interface/admin/IChangeUserStatusUsecase.interface";
import { IClientRepository } from "../../domain/repositories/client/clientRepository.interface";
import { IVendorRepository } from "../../domain/repositories/vendor/vendorRepository.interface";
import { CustomError } from "../../shared/utils/CustomError";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../shared/utils/constants";
import { client } from "../../infrastructure/cache/redis.client";

@injectable()
export class ChangeUserStatusUseCase implements IChangeUserStatusUsecase {
    constructor(
        @inject("IClientRepository") private clientRepository: IClientRepository,
        @inject("IVendorRepository") private vendorRepository: IVendorRepository
      ) {}
   async execute(userType: string, userId: any): Promise<void> {
    if (userType === "client") {
        console.log("yes its client");
        const user = await this.clientRepository.findById(userId);
  
        if (!user) {
          throw new CustomError(
            ERROR_MESSAGES.USER_NOT_FOUND,
            HTTP_STATUS.NOT_FOUND
          );
        }
  
        const newStatus = user.status === "active" ? "blocked" : "active";
  
        await this.clientRepository.findByIdAndUpdateStatus(userId, newStatus);
  
        if (newStatus === "blocked") {
          await client.set(`user_status:client:${userId}`, newStatus, {
            EX: 3600,
          });
        } else if (newStatus === "active") {
          await client.del(`user_status:client:${userId}`);
        }
      } else if (userType === "vendor") {
        console.log("yes its vendor");
  
        const user = await this.vendorRepository.findById(userId);
  
        if (!user) {
          throw new CustomError(
            ERROR_MESSAGES.USER_NOT_FOUND,
            HTTP_STATUS.NOT_FOUND
          );
        }
  
        const newStatus = user.status === "active" ? "inactive" : "active";
  
        await this.vendorRepository.findByIdAndUpdateStatus(userId, newStatus);
  
        if (newStatus === "inactive") {
          await client.set(`user_status:vendor:${userId}`, newStatus, {
            EX: 3600,
          });
        } else if (newStatus === "active") {
          await client.del(`user_status:vendor:${userId}`);
        }
      }
    }
    }

