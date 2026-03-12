const jwt = require("jsonwebtoken");

const ensureAuthenticated = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(403).json({
      message: "Unauthorized, JWT token is required",
    });
  }

  try {
    const token = authHeader.split(" ")[1]; // Bearer token

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // now req.user._id and req.user.role available
    next();
  } catch (err) {
    return res.status(403).json({
      message: "Unauthorized, JWT token is wrong or expired",
    });
  }
};

module.exports = ensureAuthenticated;
