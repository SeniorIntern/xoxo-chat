import mongoose from 'mongoose';

type Comment = {
  commentContent: string;
  userId: mongoose.Schema.Types.ObjectId;
};

const commentSchema = new mongoose.Schema<Comment>(
  {
    commentContent: {
      type: String
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  { timestamps: true }
);

const Comment = mongoose.model('Comment', commentSchema);
export default Comment;
