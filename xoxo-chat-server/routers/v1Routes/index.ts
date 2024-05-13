import express from "express";
import auth from "./auth";
import conversations from "./conversations";
import messages from "./messages";
import users from "./users";

const router = express.Router();

router.use("/users", users);
router.use("/auth", auth);
router.use("/messages", messages);
router.use("/conversations", conversations);

export default router;
