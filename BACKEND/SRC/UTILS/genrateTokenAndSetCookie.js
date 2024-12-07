import jwt from "jsonwebtoken"

export const genrateTokenAndSetCookie = (res, userId) => {
    try {

        // GENERATE THE TOKEN
        const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
            expiresIn: "7d"
        })

        return token

    } catch (err) {
        console.error(err, "genrateTokenAndSetCookie")
    }
}
