import jwt, { type JwtPayload } from "jsonwebtoken";

const decodeToken = (token: string, tokenSecret: string) => {
  const decoded = jwt.verify(token, tokenSecret) as JwtPayload;

  return decoded;
};

export default decodeToken;
