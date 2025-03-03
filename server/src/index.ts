import { Server } from "./infrastructure/http/server";
import { connectDB } from "./infrastructure/database/mongoDB/db";
import { initializeRedis } from "./infrastructure/cache/redis.client";

const PORT = process.env.PORT;

async function startServer() {
  try {
    await connectDB();

    await initializeRedis();

    const server = new Server();
    server.getApp().listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("🔥 Server startup failed:", error);
    process.exit(1); // Explicitly exit on fatal errors
  }
}
startServer();
