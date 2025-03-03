import dotenv from "dotenv";
dotenv.config();
export const config = {
    redis: {
        URI: process.env.REDIS_URI || 'redis://localhost:6379'
    },
    jwt: {
        ACCESS_SECRET:process.env.JWT_ACCESS_SECRET as string|| 'default_access_secret',
        REFRESH_SECRET:process.env.JWT_REFRESH_SECRET as string|| 'default_refresh_secret',
        ACCESS_EXPIRATION:'30m',
        REFRESH_EXPIRATION:'7d',
        ADMIN_ACCESS_EXPIRATION:'15m',
        ADMIN_REFRESH_EXPIRATION:'3d'
    }
}