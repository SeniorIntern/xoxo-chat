import express from 'express';

import { auth } from '../../middlewares';
import { Conversation } from '../../models';

const router = express.Router();

// get conv[] of a user
router.get('/:userId', async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] }
    }).populate('members');
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

// other members in a conversation
router.get('/members/:id', auth, async (req, res) => {
  // @ts-ignore
  const decoded = req.user;
  const userId = decoded._id;

  const { id: conversationId } = req.params;
  const conversation =
    await Conversation.findById(conversationId).populate('members');

  const members = conversation?.members;

  const otherMembers = members?.filter(
    // @ts-ignore
    (member) => member._id.toString() != userId
  );

  res.status(200).send(otherMembers);
});

// new conversation with a user
router.post('/', async (req, res) => {
  const { senderId, receiverId, groupIds } = req.body;
  const members = groupIds || [senderId, receiverId];

  const newConversation = new Conversation({
    members
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get conversation between users. includes two userId
router.get('/find/:firstUserId/:secondUserId', async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] }
    });
    if (!conversation) {
      return res.status(400).send('No conversation found!');
    }
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
