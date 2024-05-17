import bcrypt from 'bcrypt';
import { v2 as cloudinary } from 'cloudinary';
import express from 'express';
import _ from 'lodash';

import { serverConfig } from '../../config';
import { auth } from '../../middlewares';
import { User } from '../../models';

cloudinary.config(serverConfig.CLOUDINARY_CONFIG);
/*
cloudinary.config({
  api_secret: 'vOBPskUBcJaPXsLZfK9kG-QYb90',
  api_key: '453392965967855',
  cloud_name: 'dpwaajbmp'
});
*/
const router = express.Router();

router.get('/', auth, async (req, res) => {
  // exclude the logged user
  // @ts-ignore
  const decoded = await req.user;
  const users = await User.find({ _id: { $ne: decoded._id } });
  res.status(200).send(users);
});

router.get('/me', auth, async (req, res) => {
  console.log('recieved at users/me');
  
  // @ts-ignore
  const userId = req.user._id;
  const user = await User.findById(userId).select('-password');
  res.status(200).send(user);
});

router.get('/friends', auth, async (req, res) => {
  // @ts-ignore
  // console.log('user=', req.user);

  // @ts-ignore
  const userId = req.user._id;
  // console.log('user id=', userId);

  const friends = await User.findById(userId)
    .select('-_id friends')
    .populate('friends');

  res.status(200).send(friends?.friends);
});

router.post('/', async (req, res) => {
  const { username, email, password } = req.body;
  let user = await User.findOne({ email });
  if (user)
    return res
      .status(400)
      .send('You already have an account connected with this email address');

  user = new User({ username, email, password });
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  // @ts-ignore
  const token = user.generateAuthToken();
  res
    .header('x-auth-token', token)
    .send(_.pick(user, ['_id', 'name', 'email']));
});

router.patch('/', auth, async (req, res) => {
  const { friendId } = req.body;
  if (!friendId) return res.status(400).send('No friend Id provided');

  // @ts-ignore
  const decoded = req.user;

  let user = await User.findById(decoded._id);
  if (!user) return res.status(400).send('Bad request');

  if (!user.friends.includes(friendId)) {
    user = await User.findByIdAndUpdate(
      user._id,
      {
        friends:
          user.friends && user.friends.length > 0
            ? [...user.friends, friendId]
            : [friendId]
      },
      { new: true }
    );
    return res.status(200).send(user);
  }

  res.status(400).send('This user is already friend with you');
});

router.patch('/profileImage', auth, async (req, res) => {
  if (!req.files) {
    return res.status(400).send('No files attached');
  }

  let file = req.files.profileImage;
  try {
    // tempFilePath - A path to the temporary file when useTempFiles(express-fileupload) option is set to true.
    //@ts-ignore
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: 'users'
    });
    const { url } = result;

    // @ts-ignore
    const decoded = req.user;

    const user = await User.findByIdAndUpdate(
      decoded._id,
      {
        profileImage: url
      },
      { new: true }
    );
    return res
      .status(200)
      .send(_.pick(user, ['_id', 'username', 'email', 'profileImage']));
  } catch (error) {
    console.log(error);
    return res.status(400).send('File upload failed');
  }
});

router.patch('/coverImage', auth, async (req, res) => {
  if (!req.files) {
    return res.status(400).send('No files attached');
  }

  let file = req.files.coverImage;
  try {
    // tempFilePath - A path to the temporary file when useTempFiles(express-fileupload) option is set to true.
    //@ts-ignore
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: 'users'
    });
    const { url } = result;

    // @ts-ignore
    const decoded = req.user;

    const user = await User.findByIdAndUpdate(
      decoded._id,
      {
        coverImage: url
      },
      { new: true }
    );
    return res
      .status(200)
      .send(_.pick(user, ['_id', 'username', 'email', 'coverImage']));
  } catch (error) {
    console.log(error);
    return res.status(400).send('File upload failed');
  }
});

export default router;
