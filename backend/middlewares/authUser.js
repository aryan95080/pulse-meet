import jwt from 'jsonwebtoken'

// User authentication middleware
const authUser = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.json({ success: false, message: "Not Authorized, login again" });
    }

    const token_decode = jwt.verify(token, process.env.JWT_SECRET); 
    req.user = { id: token_decode.id };  // <-- Use req.user, not req.userId

    next();  
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

export default authUser;
