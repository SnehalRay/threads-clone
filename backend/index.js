import express from "express"
import dotenv from "dotenv"
import connectDB from "./databse/connectdb.js";
import userRoutes from "./routes/userRoutes.js"
import cookieParser from 'cookie-parser';
import postRouter from "./routes/postRoutes.js";
import {v2 as cloudinary } from "cloudinary"
import aiChatBotRoutes from "./routes/aiChatBotRoutes.js";
import dialogflowRoutes from "./routes/diagflowRoutes.js";
import messageRouter from "./routes/messagesRoutes.js";
import {app, server} from "./socket/socket.js"


dotenv.config();
await connectDB();

// const app = express();
const PORT = process.env.PORT || 8000;

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:"ypT4kPmQNT7RwBsKcPVtg5prTDY"
});

// console.log('Cloudinary Config:', {
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET ? 'Exists' : 'Not Found'
// });
//MIDDLEWARE

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());


app.get("/",(req,res)=>{
    res.send("Hello brev")
})

app.use("/api/users",userRoutes);

app.use("/api/posts", postRouter);

app.use("/api/aiChatBot",aiChatBotRoutes);

app.use("/api/dialogflow", dialogflowRoutes);

app.use("/api/messages",messageRouter)

// console.log("postRouter setup on /api/posts"); // Debugging statement

app.get("/lol",async(req,res)=>{
    res.send("LOL")
});


server.listen(PORT,()=>{console.log(`Server started with port ${PORT}...`)})

export default app;