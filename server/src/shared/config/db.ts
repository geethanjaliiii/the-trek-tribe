import mongoose from "mongoose";

export const connectDB =async ()=> {
    try {
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log("MOngo db connected");
        
    } catch (error) {
        console.error("Mongo connection failed: ",error);
        process.exit(1)
    }
}