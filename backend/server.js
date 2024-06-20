import express from "express"
import dotenv from "dotenv"
import connectDB from "./databse/connectdb.js";
import userRoutes from "./routes/userRoutes.js"
import cookieParser from 'cookie-parser';


dotenv.config();
await connectDB();

const app = express();
const PORT = process.env.PORT || 8000;


//MIDDLEWARE

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());


app.get("/",(req,res)=>{
    res.send("Hello brev")
})

app.use("/api/users",userRoutes);


app.listen(PORT,()=>{console.log(`Server started with port ${PORT}...`)})