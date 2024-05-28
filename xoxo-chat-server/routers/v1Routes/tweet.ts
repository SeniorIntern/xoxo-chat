import { v2 as cloudinary } from 'cloudinary';
import express from 'express';

import { serverConfig } from '../../config';
import { auth, checkObjId } from '../../middlewares';
import { Comment, Like, Tweet } from '../../models';

cloudinary.config(serverConfig.CLOUDINARY_CONFIG);

const router = express.Router();

router.get('/', async (req, res) => {
  const tweets = await Tweet.find().populate('user');
  res.status(200).send(tweets);
});

router.get('/user/:id', checkObjId, async (req, res) => {
  const userId = req.params.id;
  const userTweets = await Tweet.find({ user: userId }).populate('user');
  res.status(200).send(userTweets);
});

router.get('/:id', checkObjId, async (req, res) => {
  const tweetId = req.params.id;
  const tweets = await Tweet.findById(tweetId);
  res.status(200).send(tweets);
});

// likes of a tweet by tweet's _id
router.get('/like/:id', checkObjId, async (req, res) => {
  const tweetId = req.params.id;
  const tweets = await Tweet.findById(tweetId).populate('likes');
  res.status(200).send(tweets);
});

// comments of a tweet by tweet's _id
router.get('/comment/:id', checkObjId, async (req, res) => {
  const tweetId = req.params.id;
  const tweets = await Tweet.findById(tweetId).populate('comments');
  res.status(200).send(tweets);
});

router.post('/', auth, async (req, res) => {
  const attachmentUrls: String[] = [];

  if (req.files) {
    let file = req.files.attachmentUrls;

    if (Array.isArray(file)) {
      for (let f = 0; f < file.length; f++) {
        // tempFilePath - A path to the temporary file when useTempFiles(express-fileupload) option is set to true.
        //@ts-ignore
        const result = await cloudinary.uploader.upload(file[f].tempFilePath, {
          folder: 'users'
        });
        attachmentUrls.push(result.url);
        console.log('new list======', attachmentUrls);
      }
    } else {
      //@ts-ignore
      const result = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: 'users'
      });
      attachmentUrls.push(result.url);
      console.log('new list======', attachmentUrls);
    }
  }

  console.log('attachmentUrls =', attachmentUrls);

  // @ts-ignore
  const decoded = req.user;
  const userId = decoded._id;

  const tweetContent = req.body.tweetContent;

  const tweets = new Tweet({
    user: userId,
    tweetContent,
    attachmentUrls
  });
  await tweets.save();
  res.status(200).send(tweets);
});

// add comment to a tweet
router.patch('/comment/:id', checkObjId, auth, async (req, res) => {
  // @ts-ignore
  const decoded = req.user;
  const userId = decoded._id;

  const tweetId = req.params.id;

  const { commentContent } = req.body;

  const comment = new Comment({
    commentContent,
    userId
  });
  await comment.save();

  const staleTweet = await Tweet.findById(tweetId);

  const newTweet = await Tweet.findByIdAndUpdate(
    tweetId,
    {
      comments:
        staleTweet?.comments && staleTweet.comments.length > 0
          ? [...staleTweet.comments, comment._id]
          : [comment._id]
    },
    { new: true }
  );
  res.status(200).send(newTweet);
});

// add like to a tweet
router.patch('/like/:id', checkObjId, auth, async (req, res) => {
  // @ts-ignore
  const decoded = req.user;
  const userId = decoded._id;

  const tweetId = req.params.id;

  const like = new Like({
    userId
  });
  await like.save();

  const staleTweet = await Tweet.findById(tweetId);

  const newTweet = await Tweet.findByIdAndUpdate(
    tweetId,
    {
      likes:
        staleTweet?.likes && staleTweet.likes.length > 0
          ? [...staleTweet.likes, like._id]
          : [like._id]
    },
    { new: true }
  );
  res.status(200).send(newTweet);
});

router.delete('/:id', checkObjId, auth, async (req, res) => {
  const tweetId = req.params.id;
  const tweet = await Tweet.findByIdAndDelete(tweetId);
  res.status(200).send(tweet);
});

export default router;
