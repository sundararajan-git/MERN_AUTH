import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import path from "path"
import authRoutes from "./SRC/ROUTES/Auth.Route.js"
import { connectDB } from "./SRC/DB/ConnectDB.js"


dotenv.config()

const app = express()
const PORT = process.env.PORT || 8080

// MIDDLEWARES 

// ALLOWED ORGINS
const whiteList = ["http://localhost:5173/MERN_AUTH/", "https://sundararajan-git.github.io/MERN_AUTH/"]
// CONDTION APPLY
const corsOptions = {
    origin: (origin, callback) => {
        if (whiteList.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error("Not allowed by CORS"))
        }
    },
    optionSuccessStatus: 200
}

// FOR ACCESS THE API FROM THE ORIGIN
app.use(cors(corsOptions))

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



