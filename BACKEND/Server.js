import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import authRoutes from "./SRC/ROUTES/Auth.Route.js"
import { connectDB } from "./SRC/DB/ConnectDB.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 8080

// MIDDLEWARES 

// WHITELIST
const whiteList = [
    "http://localhost:5173",
    "https://sundararajan-git.github.io/MERN_AUTH"
];

// CORS CONFIGURATION
const corsOptions = {
    origin: (origin, callback) => {
        if (whiteList.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Allow cookies to be sent and received
    optionsSuccessStatus: 200
};

// ENABLE CROS
app.use(cors(corsOptions));

// FOR ACCESESS THE INCOMING REQUEST FROM THE REQ.BODY
app.use(express.json())

// FOR ACCESS THE COOKIEES
app.use(cookieParser())

// AUTH MIDDLEWARE
app.use("/api/auth", authRoutes)

// APP LISTENING
app.listen(PORT, () => {
    connectDB()
    console.log("Server is Running on the " + PORT)
})



