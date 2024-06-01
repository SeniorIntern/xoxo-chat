import { Conversation } from '../types';
import mongoose from 'mongoose';

const ConversationSchema = new mongoose.Schema<Conversation>(
  {
    members: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'User'
    }
  },
  { timestamps: true }
);

const Conversation = mongoose.model<Conversation>(
  'Conversation',
  ConversationSchema
);
export default Conversation;
