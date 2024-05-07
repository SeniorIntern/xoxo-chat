import dotenv from "dotenv";
dotenv.config();

export = {
  PORT: process.env.PORT,
  URI: process.env.URI!,
  JWT_SECRET: process.env.JWT_SECRET!,
};
