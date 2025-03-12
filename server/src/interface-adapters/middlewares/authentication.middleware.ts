import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { client } from "../../infrastructure/cache/redis.client";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../shared/utils/constants";
import { JWTService } from "../../infrastructure/services/jwt/JWTService";
const tokenService = new JWTService();
export interface CustomJWTPayload extends JwtPayload {
  id: string;
  email: string;
  role: string;
  access_token: string;
  refresh_token: string;
}

export interface CustomRequest extends Request {
  user: CustomJWTPayload;
}

const extractToken = (
  req: Request
): { access_token: string; refresh_token: string } | null => {
  const pathSegment = req.path.split("/").filter((segment) => segment);
  console.log("pathsegment", pathSegment);
  if (pathSegment.includes("admin") || pathSegment.includes("_ad")) {
    if (req.cookies["super_admin_refresh_token"]) {
      return {
        access_token: req.cookies[`super_admin_access_token`] || null,
        refresh_token: req.cookies[`super_admin_refresh_token`] || null,
      };
    }

    // Fall back to admin tokens if super_admin tokens aren't present
    if (req.cookies["admin_refresh_token"]) {
      return {
        access_token: req.cookies["admin_access_token"]||null,
        refresh_token: req.cookies["admin_refresh_token"] || null,
      };
    }
  } else if (req.cookies["vendor_refresh_token"]) {
    return {
      access_token: req.cookies["vendor_access_token"]||null,
      refresh_token: req.cookies["vendor_refresh_token"] || null,
    };
  } else if (req.cookies["client_refresh_token"]) {
    return {
      access_token: req.cookies["client_access_token"],
      refresh_token: req.cookies["client_refresh_token"] || null,
    };
  }
  console.log("No valid tokens found in cookies");
  return null;

  // if (privateRouteIndex !== -1 && pathSegment[privateRouteIndex + 1]) {
  //   const userType = pathSegment[privateRouteIndex + 1];
  //   return {
  //     access_token: req.cookies[`${userType}_access_token`] || null,
  //     refresh_token: req.cookies[`${userType}_refresh_token`] || null,
  //   };
  // }
  // return null;
};

const isBlackListed = async (token: string): Promise<boolean> => {
  if (!token) return false;
  const result = await client.get(token);
  return result === "blacklisted";
};

export const verifyAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = extractToken(req);
    console.log("token extracted", token);

    if (!token || !token.refresh_token) {
      console.log("no token");
      res.status(HTTP_STATUS.UNAUTHORIZED).json({
        message: ERROR_MESSAGES.UNAUTHORIZED_ACCESS,
      });
      return;
    }
    if (token.access_token && (await isBlackListed(token.access_token))) {
      console.log("access token is blacklisted");
      res
        .status(HTTP_STATUS.FORBIDDEN)
        .json({ message: "Token is blacklisted" });
      return;
    }
 
    const user = tokenService.verifyAccessToken(
      token.access_token
    ) as CustomJWTPayload;
    if (!user || !user.id) {
      res
        .status(HTTP_STATUS.UNAUTHORIZED)
        .json({ message: ERROR_MESSAGES.UNAUTHORIZED_ACCESS });
      return;
    }
    (req as CustomRequest).user = {
      ...user,
      access_token: token.access_token,
      refresh_token: token.refresh_token,
    };
    next();
  } catch (error: any) {
    console.log("auth error", error);
    if (error.name === "TokenExpiredError") {
      console.log("token is expired is worked");
      res
        .status(HTTP_STATUS.UNAUTHORIZED)
        .json({ message: ERROR_MESSAGES.TOKEN_EXPIRED });
      return;
    }
    console.log("token is invalid is worked");

    res
      .status(HTTP_STATUS.UNAUTHORIZED)
      .json({ message: ERROR_MESSAGES.INVALID_TOKEN });
    return;
  }
};

export const authorizeRole = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as CustomRequest).user;

    if (!user || !allowedRoles.includes(user.role)) {
      res.status(HTTP_STATUS.FORBIDDEN).json({
        message: ERROR_MESSAGES.NOT_ALLOWED,
        userRole: user ? user.role : "None",
      });
      return;
    }
    next();
  };
};

export const decodeToken =async (
  req:Request,res:Response,next:NextFunction
)=>{
  try {
    const token = extractToken(req);
    if(!token){
      console.log('no token while decoding');
      res
        .status(HTTP_STATUS.UNAUTHORIZED)
        .json({ message: ERROR_MESSAGES.UNAUTHORIZED_ACCESS });
      return;
    }
    if (await isBlackListed(token.access_token)) {
      console.log("token is black listed is worked");
      res
        .status(HTTP_STATUS.FORBIDDEN)
        .json({ message: "Token is blacklisted" });
      return;
    }
    const user = tokenService.decodeAccessToken(token?.access_token);
    console.log("decoded", user);
    (req as CustomRequest).user = {
      id: user?.id,
      email: user?.email,
      role: user?.role,
      access_token: token.access_token,
      refresh_token: token.refresh_token,
    };
    next();
  } catch (error) {
    console.log('token decode middleware error',error);
    
  }
}
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
