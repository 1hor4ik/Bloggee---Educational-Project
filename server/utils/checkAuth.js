import jwt from "jsonwebtoken";

export const checkAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({
        status: false,
        message: "Authorization header is missing!",
      });
    }

    const token = authHeader.split(" ")[1];
    console.log("Received Token:", token);

    const decoded = jwt.verify(token, process.env.KEY);
    req.userId = decoded.id;
    next();
  } catch (error) {
    console.error("JWT Error:", error);

    const isTokenExpired = error.name === "TokenExpiredError";
    return res.status(401).json({
      status: false,
      message: isTokenExpired
        ? "Token expired! Please login again."
        : "Invalid token! Please login again.",
    });
  }
};
