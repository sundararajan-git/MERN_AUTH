import express from "express"
import { checkAuth, forgetPassword, login, logout, resetPassword, signup, verifyEmail } from "../CONTROLLERS/auth.controllers.js"
import { verifyToken } from "../MIDDLEWARE/verifyToken.js"

const router = express.Router()


// LIKE PRODUCED ROUTES FOR EACH REQUEST VALIDATION
router.get("/check-auth", verifyToken , checkAuth)

// SIGNUP REQUEST
router.post("/signup", signup)

// LOGIN REQUEST
router.post("/login", login)

// LOGUT THE FROM THE APP
router.post("/logout", logout)

// VERIFIY EMAIL
router.post("/verify-email", verifyEmail)

// FORGET PASSWORD
router.post("/forgot-password", forgetPassword)

// RESET PASSWORD
router.post("/reset-password/:token", resetPassword)


export default router