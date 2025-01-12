import mongoose from'mongoose'


export const connectDB = async ()=> {
    try {
        const connection = await mongoose.connect(`${process.env.MONGOOSE_URL}`)
        
        console.log(`\n DB connected \tDB Host:  ${connection.connection.host}`)
        
    } catch (error) {
        console.log("Database Connection Error ",error);
        process.exit(1)        
    }
}
