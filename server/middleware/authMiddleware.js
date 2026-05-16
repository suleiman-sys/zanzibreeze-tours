const jwt = require("jsonwebtoken");

const JWT_SECRET =
  process.env.JWT_SECRET;

const verifyAdmin = (

  req,
  res,
  next

) => {

  try {

    const authHeader =
      req.headers.authorization;

    if (!authHeader) {

      return res.status(401).json({
        error: "No token provided",
      });

    }

    const token =
      authHeader.split(" ")[1];

    const decoded = jwt.verify(

      token,

      JWT_SECRET

    );

    req.admin = decoded;

    next();

  } catch (error) {

    console.log(error);

    return res.status(401).json({
      error: "Invalid token",
    });

  }

};

module.exports = verifyAdmin;