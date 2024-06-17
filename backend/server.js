import express from "express"
import dotenv from "dotenv"
import connectDB from "./databse/connectdb.js";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 8000;



app.listen(PORT,()=>{console.log(`Server started with port ${PORT}...`)})