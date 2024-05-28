import mongoose from 'mongoose';

type Tweet = {
  user: mongoose.Schema.Types.ObjectId;
  tweetContent: string;
  attachmentUrls: string[];
  comments: mongoose.Schema.Types.ObjectId[];
  likes: mongoose.Schema.Types.ObjectId[];
};

const tweetSchema = new mongoose.Schema<Tweet>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    tweetContent: {
      type: String
    },
    attachmentUrls: {
      type: [String]
    },
    comments: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Comment'
    },
    likes: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Like'
    }
  },
  { timestamps: true }
);

const Tweet = mongoose.model<Tweet>('Tweet', tweetSchema);
export default Tweet;
