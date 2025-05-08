
const jwt = require("jsonwebtoken");

module.exports = function verifyToken(req, res, next) {
  const token =
    req.cookies.token ||                   
    req.headers.authorization?.split(" ")[1]; 

  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userId = decoded.userId;
    req.role   = decoded.role;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
