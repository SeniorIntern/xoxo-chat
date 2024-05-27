import { Request, Response } from 'express';

import { Tweet } from '../models';

const createTweet = async (req: Request, res: Response) => {
  try {
    await Tweet.create({
      content: req.body.content,
      //@ts-ignore
      user: req.user._id
    });
    //@ts-ignore
    req.flash('info', 'Tweet Created Successfully');
    return res.redirect('back');
  } catch (err) {
    console.error('Error in creating a tweet');
    return;
  }
};

const deleteTweet = async (req: Request, res: Response) => {
  // console.log(req);
  try {
    const tweet = await Tweet.findById(req.params.id);
    //@ts-ignore
    if (tweet.user == req.user.id) {
      //@ts-ignore
      tweet.remove();
      //@ts-ignore
      Comment.deleteMany({ tweet: req.params.id }, function(err) {
        return res.redirect('back');
      });
    } else {
      return res.redirect('back');
    }
  } catch (err) {
    console.error(err);
    return;
  }
};

export = { createTweet, deleteTweet };
