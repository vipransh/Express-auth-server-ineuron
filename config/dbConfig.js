import mongoose from "mongoose";
import config from "./envConfig.js";

const dbConnect=async()=>{
    try {
        const conn=await mongoose.connect(config.MONGODB_URL);

        console.log(`Mongodb Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
}

export default dbConnect;