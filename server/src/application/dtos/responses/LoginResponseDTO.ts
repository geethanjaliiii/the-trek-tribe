import { User } from "../../../core/entities/User";

export interface LoginResponseDTO {
    user:User,
    token:string
}