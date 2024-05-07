const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();

const ConversationSchema = new mongoose.Schema(
  {
    members: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
    },
  },
  { timestamps: true },
);

const Conversation = mongoose.model("Conversation", ConversationSchema);

const PORT = process.env.PORT;
const URI = process.env.URI;

async function postConversation() {
  const newConversation = new Conversation({
    members: ["663116cf81095a2ef9e0fe9a", "6630f77d3b58d36674916fcd"],
  });

  try {
    const savedConversation = await newConversation.save();
    console.log(savedConversation);
  } catch (err) {
    if (err instanceof mongoose.MongooseError) {
      console.log(err.message);
    }
  }
}

mongoose.connect(URI).then(() => {
  console.log(`Server started on port ${PORT}...`);
  postConversation();
});

/*
const jwt = require("jsonwebtoken");

const foo = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjMxMTZjZjgxMDk1YTJlZjllMGZlOWEiLCJ1c2VybmFtZSI6Im5pa2hpbCIsImVtYWlsIjoibmlrQGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE3MTQ2NTk0MTJ9.FsLZYi2bCQYWeN67OkF7bfydYuBmovPzGl4gNcdGX2U";
console.log(jwt.decode(foo));
*/
