import mongoose from 'mongoose';

interface Conversation {
  members: [mongoose.Schema.Types.ObjectId];
}

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
