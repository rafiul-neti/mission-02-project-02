import jwt, { type JwtPayload, type SignOptions } from "jsonwebtoken";

const generateToken = (
  payload: JwtPayload,
  secret: string,
  expiresIn: SignOptions["expiresIn"],
) => {
  const generatedToken = jwt.sign(payload, secret, {
    expiresIn: expiresIn || "1d",
  });

  return generatedToken;
};

export default generateToken;
