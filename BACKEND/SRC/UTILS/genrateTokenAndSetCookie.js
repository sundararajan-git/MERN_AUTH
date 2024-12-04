import jwt from "jsonwebtoken"

export const genrateTokenAndSetCookie = (res, userId) => {
    try {
        const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
            expiresIn: "7d"
        })

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "devlopement",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: "None", // Needed for cross-origin requests
            domain: 'https://pro-hunt.onrender.com' 
        })

        return token

    } catch (err) {
        console.error(err, "genrateTokenAndSetCookie")
    }
}
