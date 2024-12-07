import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    try {
        // EXTRACT THE TOKEN
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res
                .status(401)
                .json({ success: false, message: "Unauthorized - no token provided" });
        }

        // REMOVE BARRIER FROM THE TOKEN
        const token = authHeader.split(" ")[1];

        // VERIFY THE TOKEN
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res
                .status(401)
                .json({ success: false, message: "Unauthorized - invalid token" });
        }

        req.userId = decoded.userId;

        next();
    } catch (err) {
        console.error("Token verification error:", err.message);
        res.status(401).json({ success: false, message: "Unauthorized - invalid token" });
    }
};
