import jwt from "jsonwebtoken"


export const verifyToken = (req, res, next) => {
    try {
        const token = req.cookies.token

        if (!token) {
            return res.status(400).json({ success: false, message: "Unauthorized - no token provied" })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if (!decoded) {
            return res.status(400).json({ success: false, message: "Unauthorized - invalid token provied" })
        }

        req.userId = decoded.userId

        next()

    } catch (err) {
        console.error(err)
        res.status(400).json({ success: false, message: err.message })
    }

}