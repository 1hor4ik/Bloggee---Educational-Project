import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    image: { type: String },
    title: { type: String, required: true },
    description: { type: String, required: true },
    tags: { type: Array, default: [] },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    viewsCount: { type: Number, default: 0 },
    likesCount: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [
      {
        comment: String,
        createdAt: { type: Date, default: Date.now() },
        commentedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      },
    ],
  },
  { timestamps: true }
);

const PostModel = mongoose.model("Post", PostSchema);
export { PostModel as Post };
