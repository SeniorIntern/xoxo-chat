import bcrypt from "bcrypt";
import express from "express";
import _ from "lodash";
import { auth } from "../../middlewares";
import { User } from "../../models";
const router = express.Router();

router.get("/", auth, async (req, res) => {
  // exclude the logged user
  // @ts-ignore
  const decoded = await req.user;
  const users = await User.find({ _id: { $ne: decoded._id } });
  res.status(200).send(users);
});

router.get("/me", auth, async (req, res) => {
  // @ts-ignore
  const user = await req.user;
  res.status(200).send(user);
});

router.get("/friends", auth, async (req, res) => {
  // @ts-ignore
  // console.log('user=', req.user);
  
  // @ts-ignore
  const userId = req.user._id;
  // console.log('user id=', userId);
  
  const friends = await User.findById(userId)
    .select("-_id friends")
    .populate("friends");

  res.status(200).send(friends?.friends);
});

router.post("/", async (req, res) => {
  const { username, email, password } = req.body;
  let user = await User.findOne({ email });
  if (user) return res.status(400).send("User already registered.");

  user = new User({ username, email, password });
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  // @ts-ignore
  const token = user.generateAuthToken();
  res
    .header("x-auth-token", token)
    .send(_.pick(user, ["_id", "name", "email"]));
});

router.patch("/", auth, async (req, res) => {
  const { friendId } = req.body;
  if (!friendId) return res.status(400).send("No friend Id provided");
  // @ts-ignore
  const decoded = req.user;

  let user = await User.findById(decoded._id);
  if (!user) return res.status(400).send("Bad request");

  if (!user.friends.includes(friendId)) {
    user = await User.findByIdAndUpdate(
      user._id,
      {
        friends:
          user.friends && user.friends.length > 0
            ? [...user.friends, friendId]
            : [friendId],
      },
      { new: true },
    );
    return res.status(200).send(user);
  }

  res.status(400).send("This user is already friend with you");
});

export default router;
