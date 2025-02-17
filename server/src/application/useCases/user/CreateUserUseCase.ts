import { User } from "../../../core/entities/User";
import { ERROR_CODES } from "../../../shared/constants/errorCodes";
import { ERROR_MESSAGES } from "../../../shared/constants/errorMessages";
import { CustomError } from "../../../shared/exceptions/CustomError";
import { RegisterUserDTO } from "../../dtos/requests/RegisterUserInputDTO";
import { RegisterUserResponseDTO } from "../../dtos/responses/RegisterResponseDTO";
import { IUserRepository } from "../../interfaces/repositories/IUserRepository";

// export class CreateUserUseCase{
//     constructor(private userRepository: IUserRepository){}
//     async execute(data:RegisterUserDTO):Promise<RegisterUserResponseDTO>{
//         const user=await this.userRepository.findByEmail(data.email)
//         if(user){
//             throw new CustomError(ERROR_MESSAGES.USER_EXISTS,ERROR_CODES.UNAUTHORIZED)
//         }
//         //hash pasword
//         //save
//     }
// }