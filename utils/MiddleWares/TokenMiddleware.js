const jwt = require("jsonwebtoken");
const SendJson = require("../Response");
const dotenv = require("dotenv");

function authenticateToken(req, res, next) {
  var token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ message: "No Token Provided" });
  }
  if (token && token.startsWith("Bearer ")) {
    token = token.substring(7);
  } else {
    return res.status(401).json({ message: "Not a Valid Token" });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    
    if (err) {
      console.log("err",err);
      console.log(token);
      
      return res.status(403).json({ message: "Failed to authenticate token." });
    }
    req.user = decoded.id;
    req.role = decoded.role;
    next();
  });
}

module.exports = authenticateToken;
