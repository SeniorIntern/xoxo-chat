import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import { serverConfig } from "./config";
import v1Routes from "./routers/v1Routes";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000", // Your client's origin
    credentials: true, // This line allows credentials
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/status", (req, res) => {
  res.status(200).json("API is live");
});
app.use("/api/v1", v1Routes);

const { PORT, URI } = serverConfig;
mongoose
  .connect(URI)
  .then(() =>
    app.listen(PORT, () => console.log(`Server started on port ${PORT}...`)),
  );
