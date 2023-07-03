const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  // Get token from header
  const JWT_SECRET = "secret";
  const token = req.header("x-auth-token");

  // Check if no token
  if (!token) {
    return res.json({
      data: { code: 401, msg: "No token, authorization denied" },
    });
  }

  // Verify token
  try {
    jwt.verify(token, JWT_SECRET, (error, decoded) => {
      if (error) {
        return res.json({ data: { code: 401, msg: "Server Error" } });
      } else {
        // console.log("decoded - ", decoded);

        req.user = decoded.name;
        req.userID = decoded.id;
        next();
      }
    });
  } catch (err) {
    console.error("something wrong with auth middleware");
    res.json({ data: { code: 401, msg: "Server Error" } });
  }
};
