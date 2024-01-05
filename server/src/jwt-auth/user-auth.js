import jwt from "jsonwebtoken";

export const generateUserJWT = payload => {









  return jwt.sign(payload, process.env.USER_TOKEN_SECRET, {
    expiresIn: process.env.TOKEN_EXPIRY
  })
}
