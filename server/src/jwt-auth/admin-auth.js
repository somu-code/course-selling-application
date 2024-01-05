import jwt from "jsonwebtoken";

export const generateAdminJWT = (adminPayloadObject) => {
  return jwt.sign(adminPayloadObject, process.env.ADMIN_TOKEN_SECRET, {
    expiresIn: process.env.TOKEN_EXPIRY,
  });
};

export const authenticateAdminJWT = async (req, res, next) => {
  const token = req.cookies.accessToken;
  if (token) {
    jwt.verify(token, process.env.ADMIN_TOKEN_SECRET, (error, admin) => {
      if (error) {
        console.log("this code runs");
        res.sendStatus(403);
      } else {
        req.admin = admin;
        next();
      }
    });
  } else {
    res.sendStatus(403);
  }
};
