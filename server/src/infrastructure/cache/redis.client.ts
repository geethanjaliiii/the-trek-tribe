
import { createClient } from "redis";
import { config } from "../../shared/config/config";

export const client= createClient({
    url: config.redis.URI,
    socket:{
        connectTimeout: 30000,
        reconnectStrategy: (retries) =>{
            if(retries >10 ){
                console.log('Too many retries, not attempting to reconnect to Redis');
                return new Error("Too many retries");
            }
            return Math.min(retries * 500, 10000); // Incremental backoff
        }
    }
})

client.on("error",(err)=>console.error("Redis Error",err)
)

client.on('connect',()=>console.log("✅ Redis connected successfully!"));

// Export a function to initialize Redis instead of connecting immediately
export async function initializeRedis() {
    try {
      await client.connect();
      return client;
    } catch (error) {
      console.error("Failed to connect to Redis:", error);
      throw error;
    }
  }