import mongoose from 'mongoose';

type Like = {
  userId: mongoose.Schema.Types.ObjectId;
};

const likeSchema = new mongoose.Schema<Like>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Like = mongoose.model<Like>('Like', likeSchema);
export default Like;
