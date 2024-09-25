import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from "dotenv";
import { connectDb } from './utils/db.js';
import userRoute from "./routes/user.routes.js";
//Initializing the express object
const app = express();

dotenv.config();
app.use(express.json());//this indicates use of json data
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());//used for storing and retrieving web token

const corsOption ={
    origin:'http://localhost:5173',
    credentials:true
}
app.use(cors(corsOption));

app.get("/home",(req,res)=>{
    return res.status(200).json({
        message:"Data coming from backend"
    })
})
const PORT = process.env.PORT || 3000;
const URL = process.env.URL;

//apis
app.use("/api/v1/user",userRoute);



app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    connectDb();
})