import { inject, injectable } from "tsyringe";
import { IRefrshTokenUsecase } from "../../../usecases/interface/auth/IRefreshTokenUseCase";
import { CustomRequest } from "../../middlewares/authentication.middleware";
import { Request, Response } from "express";
import { clearAuthCookies, updateCookieWithAccessToken } from "../../../shared/utils/cookieHelper";
import { ERROR_MESSAGES, HTTP_STATUS, SUCCESS_MESSAGES } from "../../../shared/utils/constants";

@injectable()
export class RefreshTokenController {
constructor(@inject("IRefrshTokenUsecase")private refreshTokenUsecase:IRefrshTokenUsecase){}
async handle(req:Request, res:Response):Promise<void>{
    try {
        const refreshToken =(req as CustomRequest).user.refresh_token;
        console.log(refreshToken,'refreshToken');
        
        const newToken = this.refreshTokenUsecase.execute(refreshToken);
        const accessTokenName = `${newToken.role}_access_token`;
        updateCookieWithAccessToken(res,newToken.accessToken,accessTokenName);
        res.status(HTTP_STATUS.OK).json({ success: true, message: SUCCESS_MESSAGES.OPERATION_SUCCESS })
    } catch (error) {
        clearAuthCookies(
            res,
            `${(req as CustomRequest).user.role}_access_token`,
            `${(req as CustomRequest).user.role}_refresh_token`
          );
          res
            .status(HTTP_STATUS.UNAUTHORIZED)
            .json({ message: ERROR_MESSAGES.INVALID_TOKEN });
        }
    }
}
