import { Server } from "./infrastructure/http/server";
import { connectDB } from "./infrastructure/database/mongoDB/db";

const PORT = process.env.PORT;

async function startServer() {
  try {
    await connectDB();
    const server = new Server();
    server.getApp().listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("🔥 Server startup failed:", error);
  }
}
startServer();
