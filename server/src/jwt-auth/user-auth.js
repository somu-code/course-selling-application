import jwt from "jsonwebtoken";

export const generateUserJWT = (payload) => {
  return jwt.sign(payload, process.env.USER_TOKEN_SECRET, {
    expiresIn: process.env.TOKEN_EXPIRY,
  });
};

export async function authenticateUserJWT(req, res, next) {
  const token = req.cookies.userAccessToken;
  if (token) {
    jwt.verify(token, process.env.USER_TOKEN_SECRET, (error, userPayloadData) => {
      if (error) {
        return res.sendStatus(403);
      } else {
        req.user = userPayloadData;
        next();
        return;
      }
    })
  } else {
    return res.sendStatus(403);
  }
}
