import { PaginatedUsersDTO } from "../../../shared/dtos/pagenatedUserResponse.dto";

export interface IGetAllUserUsecase {
    execute(userType: string,
        pageNumber: number,
        pageSize:number,
        searchTerm:string
    ):Promise<PaginatedUsersDTO>
}