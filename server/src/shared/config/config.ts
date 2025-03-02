import dotenv from "dotenv";
dotenv.config();
export const config = {
    redis: {
        URI: process.env.REDIS_URI || 'redis://localhost:6379'
    }
}