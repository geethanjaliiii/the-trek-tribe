export interface RegisterUserDTO {
    fullName:string,
    email:string,
    password:string
    role:'user'|'vendor'
}