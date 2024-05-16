import { ConfigOptions } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

const cloudinaryConfigOptions: ConfigOptions = {
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
};

export = {
  PORT: process.env.PORT,
  URI: process.env.URI!,
  JWT_SECRET: process.env.JWT_SECRET!,
  CLOUDINARY_CONFIG: cloudinaryConfigOptions
};
