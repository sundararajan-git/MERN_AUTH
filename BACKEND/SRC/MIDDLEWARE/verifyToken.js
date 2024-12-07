import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    try {
        // GET TOKEN FROM THE COOKIES
        const token = req?.cookies?.token

        // VERIFY THE TOKEN
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res
                .status(401)
                .json({ success: false, message: "Unauthorized - invalid token" });
        }

        req.userId = decoded.userId;
        // VERIFY THE USER ID FROM DATA BASE
        next();
    } catch (err) {
        console.error("Token verification error:", err.message);
        res.status(401).json({ success: false, message: "Unauthorized - invalid token" });
    }
};
