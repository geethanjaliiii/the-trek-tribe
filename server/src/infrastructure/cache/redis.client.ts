
import { createClient } from "redis";
import { config } from "../../shared/config/config";

export const client= createClient({
    url: config.redis.URI
})

client.on("error",(err)=>console.error("Redis Error",err)
)

client.on('connect',()=>console.log("✅ Redis connected successfully!"));

(async () =>{
    await client.connect();
})()
