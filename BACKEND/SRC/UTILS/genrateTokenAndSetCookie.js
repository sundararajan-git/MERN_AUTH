import jwt from "jsonwebtoken"

export const genrateTokenAndSetCookie = (res, userId) => {
    try {
        
        // GENERATE THE TOKEN
        const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
            expiresIn: "7d"
        })

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "devlopement",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return token

    } catch (err) {
        console.error(err, "genrateTokenAndSetCookie")
    }
}
