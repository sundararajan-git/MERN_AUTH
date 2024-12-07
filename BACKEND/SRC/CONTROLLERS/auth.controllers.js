import { User } from "../MODELS/User.Model.js"
import bcryptjs from "bcryptjs"
import crypto from "crypto"
import { genrateTokenAndSetCookie } from "../UTILS/genrateTokenAndSetCookie.js"
import { sendPasswordResetEmail, sendResetSuccessful, sendVerificationMail, sendWelcome } from "../MAIL/Email.js"

// FOR NEW USER ONLY 
export const signup = async (req, res) => {
    const { email, password, name } = req.body
    try {

        // VALIDATE THE REQUIRED FIELDS
        if (!email || !password || !name) {
            throw new Error("All fields required")
        }

        // CHECK USER IS ALREDY REGISTERD OR NOT
        const userAlreadyExists = await User.findOne({ email })

        if (userAlreadyExists) {
            throw new Error("User already exists")
        }

        // HASH THE PASSWORD
        const hashedpassword = await bcryptjs.hash(password, 10)

        // GENERATE THE VERIFICATION TOKEN
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString()

        // CREATE USER OBJECT
        const user = new User({
            email,
            password: hashedpassword,
            name,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
        })


        await user.save()


        res.status(201).json({
            success: true,
            message: "User created sucessfully",
            user: {
                ...user._doc,
                password: undefined,
            }
        })

        const emailDetails = {
            token: verificationToken,
            email: user.email
        }

        await sendVerificationMail(emailDetails)

    } catch (err) {
        console.error(err, "signup")
        res.status(400).json({ success: false, message: err.message })
    }
}

// VERIFY THE NEW USER
export const verifyEmail = async (req, res) => {
    try {
        const { code } = req.body

        if (!code) {
            throw new Error("Code is required")
        }

        const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: { $gt: Date.now() }
        })

        if (!user) {
            return res.status(400).json({ success: false, message: "Invlaid or expired verification code" })
        }

        user.idVerfied = true;
        user.verificationToken = undefined
        user.verificationTokenExpiresAt = undefined

        await user.save()

        res.status(200).json({
            success: true,
            message: "Email Verification Successfully",
            user: {
                ...user._doc,
                password: undefined
            }
        })

        const emailDetails = {
            name: user.name,
            email: user.email
        }

        sendWelcome(emailDetails)

    } catch (err) {
        console.error(err, "verifyEmail")
        res.status(400).json({ success: false, message: err.message })
    }

}


// FOR LOGIN THE VERIFIED USER
export const login = async (req, res) => {
    try {

        const { email, password } = req.body

        if (!email || !password) {
            throw new Error("All Fields are Required")
        }

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid User" })
        }

        const isPasswordValid = await bcryptjs.compare(password, user.password)

        if (!isPasswordValid) {
            return res.status(400).json({ success: false, message: "Invalid Password" })
        }

        const token = genrateTokenAndSetCookie(res, user._id)

        user.lastlogin = new Date()

        await user.save()

        res.status(200).json({ success: true, message: "Logged in successfully", user: { ...user._doc, password: undefined, token } })

    } catch (err) {
        console.error(err, "login")
        res.status(400).json({ success: false, message: err.message })
    }
}


// FOR LOGOUT THE USER
export const logout = async (req, res) => {
    try {
        res.status(200).json({ success: true, message: "logged out successfully" })
    } catch (err) {
        console.error(err, "logout")
        res.status(400).json({ success: false, message: err.message })
    }
}

//  FOR FORGOT PASSWORD FORM USER
export const forgetPassword = async (req, res) => {
    try {
        const { email } = req.body

        if (!email) {
            throw new Error("Email Filed Required")
        }
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid user" })
        }

        // GERERATE RESET TOKEN

        const resetToken = crypto.randomBytes(20).toString("hex")
        const resetTokenExpiredAt = Date.now() + 1 * 60 * 60 * 1000 // 1 HOUR 

        user.resetPasswordToken = resetToken
        user.resetPasswordExpiresAt = resetTokenExpiredAt

        await user.save()

        res.status(200).json({ success: true, message: "Password reset link sent to your email" });


        const emailDetails = {
            link: `${process.env.VITE_API_URL}${resetToken}`,
            email: user.email
        }

        sendPasswordResetEmail(emailDetails)

    } catch (err) {
        console.error(err, "forgetPassword")
    }
}

//  RESET THE PASSWORD
export const resetPassword = async (req, res) => {
    try {
        const { token } = req.params
        const { password } = req.body

        if (!token || !password) {
            throw new Error("All fields required")
        }

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpiresAt: { $gt: Date.now() },
        })

        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid or expired token" })
        }

        // UPDATE PASSWORD
        const hashedpassword = await bcryptjs.hash(password, 10)

        user.password = hashedpassword
        user.resetPasswordToken = undefined
        user.resetPasswordExpiresAt = undefined

        await user.save()

        res.status(200).json({ success: true, message: "Password reset successful" });

        const emailDetails = {
            email: user.email
        }

        sendResetSuccessful(emailDetails)

    } catch (err) {
        console.error(err, "resetPassword")
        res.status(400).json({ success: false, message: err.message })
    }
}


// CHECK AUTH IS VLAID OR NOT 
export const checkAuth = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password")
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" })
        }
        res.status(200).json({ success: true, user })

    } catch (err) {
        console.error(err)
        res.status(400).json({ success: false, message: err.message })
    }
}