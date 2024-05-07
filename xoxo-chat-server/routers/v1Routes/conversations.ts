import express from "express";
import { Conversation } from "../../models";
const router = express.Router();

//get conv[] of a user
router.get("/:userId", async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    }).populate("members");
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

//new conversation with a user
router.post("/", async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get conversation between users. includes two userId
router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    if (!conversation) {
      return res.status(400).send("No conversation found!");
    }
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
