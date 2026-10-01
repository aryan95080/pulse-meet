import jwt from "jsonwebtoken";

const authAdmin = async (req, res, next) => {
  try {
    const { atoken } = req.headers;

    if (!atoken) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized, login again",
      });
    }

    const token_decode = jwt.verify(atoken, process.env.JWT_SECRET);

    if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized, login again",
      });
    }

    next();
  } catch (error) {
    console.log("Auth Admin Error:", error);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token. Please login again",
    });
  }
};

export default authAdmin;