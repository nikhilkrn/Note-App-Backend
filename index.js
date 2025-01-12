import {connectDB}  from './src/db/index.js'
import env  from 'dotenv'
import app  from './app.js'

env.config({
    path:'./.env'
})

connectDB().then(()=>{
    app.listen(process.env.PORT, ()=>{
        console.log(`Server is running on port ${process.env.PORT}`);
    })
}).catch((err)=>{
    console.log('MongoDB connection failed!!',err)
})