import express from "express";
const router = express.Router();
import v1Routes from "./v1Routes";

router.use("/v1", v1Routes);

export default router;
