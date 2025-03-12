import { inject, injectable } from "tsyringe";
import { PaginatedUsersDTO } from "../../shared/dtos/pagenatedUserResponse.dto";
import { IGetAllUserUsecase } from "../interface/admin/IGetAllUserUsecase.interface";
import { IVendorRepository } from "../../domain/repositories/vendor/vendorRepository.interface";
import { IClientRepository } from "../../domain/repositories/client/clientRepository.interface";
import { CustomError } from "../../shared/utils/CustomError";
import { HTTP_STATUS } from "../../shared/utils/constants";

@injectable()
export class GetAllUserUseCase implements IGetAllUserUsecase {
  constructor(
    @inject("IVendorRepository") private vendorRepo: IVendorRepository,
    @inject("IClientRepository") private clientRepo: IClientRepository
  ) {}
  async execute(
    userType: string,
    pageNumber: number,
    pageSize: number,
    searchTerm: string
  ): Promise<PaginatedUsersDTO> {
    let filter: any = {};
    if (userType) {
      filter.role = userType;
    }
    if (searchTerm) {
      filter.$or = [
        { fullName: { $regex: searchTerm, $options: "i" } },
        { email: { $regex: searchTerm, $options: "i" } },
      ];
    }
    const validPageNumber =Math.max(1,pageNumber ||1);
    const validPageSize =Math.max(1,pageSize||10);
    const skip =(validPageNumber-1)*validPageSize;
    const limit =validPageSize

    if(userType=='client'){
        const {user,total} = await this.clientRepo.find(filter,skip,limit)
        const response:PaginatedUsersDTO = {
            user,
            total:Math.ceil(total/validPageSize)
        };

        return response;
    }
    if (userType === "vendor") {
        const { user, total } = await this.vendorRepo.find(
          filter,
          skip,
          limit
        );
  
        const response: PaginatedUsersDTO = {
          user,
          total: Math.ceil(total / validPageSize),
        };
  
        return response;
      }
      throw new CustomError(
        "Invalid user type. Expected 'client' or 'vendor'.",
        HTTP_STATUS.BAD_REQUEST
      );
  }
}
