import jwt from "jsonwebtoken";

// User authentication middleware
const authUser = async (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Please login to continue",
      });
    }

    const token_decode = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.userId = token_decode.id;

    next();
  } catch (error) {
    console.log(error);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token. Please login again",
    });
  }
};

export default authUser;