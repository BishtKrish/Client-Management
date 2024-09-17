import mongoose from "mongoose";


export const connectdb = async ()=>{
    try {
        const connection =await mongoose.connect(process.env.MONGOOSE_URL)
        console.log("database connected");
        
    } catch (error) {
        console.log("database connection failed");
        
    }
}
