import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.join(process.cwd(), ".env"),
});

const config = {
  connection_string: process.env.CONNECTION_STRING as string,
  port: process.env.PORT,
  jwt_secret: process.env.TOKEN_SECRET,
  jwt_refresh_secret: process.env.REFRESH_SECRET,
  access_token_expires_in: process.env.TOKEN_EXPIRES,
  refresh_token_expires_in: process.env.REFRESH_EXPIRES,
  url: process.env.URL
};

export default config;
