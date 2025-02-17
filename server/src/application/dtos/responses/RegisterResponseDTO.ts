import { User } from "../../../core/entities/User";

export interface RegisterUserResponseDTO{
    user:User;
    token:string
}