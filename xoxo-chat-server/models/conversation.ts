import mongoose from 'mongoose';

import { Conversation } from '../types';

const ConversationSchema = new mongoose.Schema<Conversation>(
  {
    members: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'User'
    },
    lastMessage: {
      type: String
    },
    lastSender: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'User'
    },
    isGroup: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

const Conversation = mongoose.model<Conversation>(
  'Conversation',
  ConversationSchema
);
export default Conversation;
