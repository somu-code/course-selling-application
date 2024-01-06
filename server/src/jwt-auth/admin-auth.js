import jwt from "jsonwebtoken";

export const generateAdminJWT = (adminPayloadObject) => {
  return jwt.sign(adminPayloadObject, process.env.ADMIN_TOKEN_SECRET, {
    expiresIn: process.env.TOKEN_EXPIRY,
  });
};

export const authenticateAdminJWT = async (req, res, next) => {
  const token = req.cookies.adminAccessToken;
  if (token) {
    jwt.verify(
      token,
      process.env.ADMIN_TOKEN_SECRET,
      (error, adminPayloadData) => {
        if (error) {
          res.sendStatus(403);
        } else {
          req.admin = adminPayloadData;
          next();
        }
      },
    );
  } else {
    res.sendStatus(403);
  }
};
