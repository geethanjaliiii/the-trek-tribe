

// import { Request, Response, NextFunction } from "express";
// import jwt from "jsonwebtoken";
// import { CustomError } from "../../shared/utils/CustomError";
// import { ERROR_MESSAGES, HTTP_STATUS } from "../../shared/utils/constants";

// export interface AuthenticatedRequest extends Request {
//   user?: { id: string; email: string; role: string };
// }

// export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
//   const role = req.body.role || req.query.role || "client"; // Default to 'client' if not provided; adjust based on your logic
//   const accessTokenName = `${role}_access_token`;
//   const accessToken = req.cookies[accessTokenName];

//   if (!accessToken) {
//     throw new CustomError(ERROR_MESSAGES.UNAUTHORIZED_ACCESS, HTTP_STATUS.UNAUTHORIZED);
//   }

//   try {
//     const decoded = jwt.verify(accessToken, process.env.JWT_SECRET || "your-access-secret") as {
//       id: string;
//       email: string;
//       role: string;
//     };
//     req.user = decoded; // Attach decoded user info to request
//     next();
//   } catch (error) {
//     if (error instanceof jwt.TokenExpiredError) {
//       res.status(HTTP_STATUS.UNAUTHORIZED).json({
//         success: false,
//         message: ERROR_MESSAGES.TOKEN_EXPIRED,
//         action: "refresh", // Suggest refreshing the token
//       });
//       return;
//     }
//     if (error instanceof jwt.JsonWebTokenError) {
//       throw new CustomError(ERROR_MESSAGES.FORBIDDEN, HTTP_STATUS.FORBIDDEN);
//     }
//     throw new CustomError(ERROR_MESSAGES.SERVER_ERROR, HTTP_STATUS.INTERNAL_SERVER_ERROR);
//   }
// };