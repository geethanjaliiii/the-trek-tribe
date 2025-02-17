import { ERROR_CODES } from "../../../shared/constants/errorCodes";
import { ERROR_MESSAGES } from "../../../shared/constants/errorMessages";
import { CustomError } from "../../../shared/exceptions/CustomError";
import { LoginRequestDTO } from "../../dtos/requests/LoginRequestDTO";
import { LoginResponseDTO } from "../../dtos/responses/LoginResponseDTO";
import { IUserRepository } from "../../interfaces/repositories/IUserRepository";
import { IAuthService } from "../../interfaces/services/IAuthService";


export class LoginUserUseCase {
   constructor(private userRepository:IUserRepository,
    private authService:IAuthService
   ){

   }
   async execute(data: LoginRequestDTO):Promise<LoginResponseDTO>{
      const user =await this.userRepository.findByEmail(data.email);
      if(!user){
         throw new CustomError(ERROR_MESSAGES.USER_NOT_FOUND,ERROR_CODES.NOT_FOUND)
      }
      const isValidPassword=await this.authService.comparePassword(data.password,user.password)
      if(!isValidPassword){
         throw new CustomError(ERROR_MESSAGES.UNAUTORIZED, ERROR_CODES.UNAUTHORIZED)
      }
      const token=await this.authService.generateToken(user)
      return {user,token}
   }
}