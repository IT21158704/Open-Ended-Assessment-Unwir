import mongoose from "mongoose";

export const dbConfig = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL).then(()=>{
            console.log('Database Connected !!');
        })
    } catch (error) {
        console.log(error);
    }
}