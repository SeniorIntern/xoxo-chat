import mongoose from 'mongoose';

interface Message {
  conversationId: mongoose.Schema.Types.ObjectId;
  sender: string;
  text: string;
  attachmentUrls: string[];
}

const MessageSchema = new mongoose.Schema<Message>(
  {
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Conversation'
    },
    sender: {
      type: String
    },
    text: {
      type: String
    },
    attachmentUrls: {
      type: [String]
    }
  },
  { timestamps: true }
);

const Message = mongoose.model<Message>('Message', MessageSchema);
export default Message;
