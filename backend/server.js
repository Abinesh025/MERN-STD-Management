import express from "express";
import dontenv from "dotenv";
import path from "path"
import { fileURLToPath } from "url";
import authRouter from "./Routes/authRoutes.js";
import { connectDB } from "./db/database.js";
import cookieParser from "cookie-parser";
import stdRouter from "./Routes/stdRoutes.js";
import cors from "cors";
import { v2 as cloudinary } from "cloudinary";


// ------------------PORT Connection----------- //
const filename = path.dirname(fileURLToPath(import.meta.url))
dontenv.config({path:path.join(filename,"Config",".env")});

const app = express();

app.use(express.json({limit:"5mb"}));
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET_KEY
})

const dirname = path.resolve();

app.use(express.json({limit:"5mb"}));
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));

app.use("/api/auther",authRouter);

app.use("/api/student",stdRouter);

    // <-------Deployement----->

    if(process.env.MODE==="Production"){
        app.use(express.static(path.join(dirname,"frontend/dist")))
        app.use((req,res)=>{
            res.sendFile(path.resolve(dirname,"frontend","dist","index.html"))
        })
    }


app.listen(process.env.PORT,()=>{
    console.log("Serevr is runs on " + process.env.PORT);
    connectDB();
})