const jwt = require("jsonwebtoken");

module.exports.verifyToken =async (req, res, next) => {
  const token = req.headers.authorization
  console.log("tokenfroom verificato",token)
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
    req.userId = decoded.userId;
    next();
  });
};
