const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
  console.log(req);
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const token = req.headers.authorization.split(" ")[1]; // "Bearer TOKEN"
    if (!token) {
      return res.status(401).json({ message: "Not Authorized" });
    }

    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Not Authorized" });
  }
};
