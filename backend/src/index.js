import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { app,server } from './lib/socket.js'

import path from "path";

import authRouter from './routes/auth.route.js'
import messageRouter from './routes/message.route.js'



import {connectDB} from "./lib/db.js"
import cookieParser from 'cookie-parser'

dotenv.config()
//const app=express()

const PORT=process.env.PORT
const __dirname=path.resolve();

//app.use(express.json())
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}))


app.use('/api/auth',authRouter)
app.use('/api/messages',messageRouter)

if(process.env.NODE_ENV==='production'){
    app.use(express.static(path.join(__dirname,"../client/dist")));

    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,"../client","dist","index.html"));
    });
}


server.listen(PORT,()=>{
    console.log("Server is running at"+PORT)
    connectDB()
})