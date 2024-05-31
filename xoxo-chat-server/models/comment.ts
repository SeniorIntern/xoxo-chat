import mongoose from 'mongoose';

type Comment = {
  commentContent: string;
  userId: mongoose.Schema.Types.ObjectId;
  profileImage: string;
  username: string;
};

const commentSchema = new mongoose.Schema<Comment>(
  {
    commentContent: {
      type: String
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    username: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50
    },
    profileImage: {
      type: String
    }
  },
  { timestamps: true }
);

const Comment = mongoose.model('Comment', commentSchema);
export default Comment;
