import express from "express";
import { Post } from "../models/Post.js";
import { postCreateValidation } from "../validations.js";
import { checkAuth } from "../utils/checkAuth.js";
import appIo from "../server.js";

const router = express.Router();

router.post("/create", checkAuth, postCreateValidation, async (req, res) => {
  try {
    console.log("Request Headers:", req.headers);
    if (!req.userId) {
      return res.status(400).json({ message: "User is not authenticated" });
    }

    const doc = new Post({
      title: req.body.title,
      description: req.body.description,
      image: req.body.image,
      tags: req.body.tags.split(" "),
      author: req.userId,
    });

    const post = await doc.save();
    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to Create Post" });
  }
});

router.get("/getAll", async (req, res) => {
  try {
    const posts = await Post.find().populate("author").exec();
    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get posts" });
  }
});

router.get("/getLatestTags", async (req, res) => {
  try {
    const posts = await Post.find().limit(5).exec();

    const tags = posts
      .map((post) => post.tags)
      .flat()
      .slice(0, 5);

    res.json(tags);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get tags" });
  }
});

router.get("/getOne/:id", async (req, res) => {
  try {
    const postId = req.params.id;

    const doc = await Post.findOneAndUpdate(
      { _id: postId },
      { $inc: { viewsCount: 1 } },
      { returnDocument: "after" }
    )
      .populate("author")
      .exec();

    if (!doc) {
      return res.status(404).json({ message: "Document is not found" });
    }

    res.json(doc);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get post" });
  }
});

router.patch("/update/:id", checkAuth, async (req, res) => {
  try {
    const postId = req.params.id;

    await Post.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        title: req.body.title,
        description: req.body.description,
        image: req.body.image,
        author: req.body.author,
        tags: req.body.tags,
      }
    );

    res.json({ message: "Post updated successfully", success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to update post" });
  }
});

router.patch("/like/:id", checkAuth, async (req, res) => {
  try {
    const postId = req.params.id;

    const post = await Post.findByIdAndUpdate(
      {
        _id: postId,
      },
      { $addToSet: { likesCount: req.userId } },
      { returnDocument: "after" }
    );
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate("author", "username");
    appIo.emit("like", posts);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    await post.save();

    res.json({
      message: "Successfully liked!",
      success: true,
      post,
      posts,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to like post" });
  }
});

router.patch("/unlike/:id", checkAuth, async (req, res) => {
  try {
    const postId = req.params.id;

    const post = await Post.findByIdAndUpdate(
      {
        _id: postId,
      },
      { $pull: { likesCount: req.userId } },
      { returnDocument: "after" }
    );
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate("author", "username");
    appIo.emit("unlike", posts);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    await post.save();

    res.json({
      message: "Successfully liked!",
      success: true,
      post,
      posts,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to unlike post" });
  }
});

router.post("/comment/:id", checkAuth, async (req, res) => {
  const { comment } = req.body;
  try {
    const postId = req.params.id;

    const commentData = {
      comment,
      commentedBy: req.userId,
    };

    const postWithComment = await Post.findByIdAndUpdate(
      postId,
      { $push: { comments: commentData } },
      { new: true }
    )
      .populate("comments.commentedBy", "username email")
      .exec();

    if (!postWithComment) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json({
      message: "Successfully commented!",
      success: true,
      post: postWithComment,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to comment on the post" });
  }
});

router.delete("/delete/:id", checkAuth, async (req, res) => {
  try {
    const postId = req.params.id;

    const doc = await Post.findOneAndDelete({ _id: postId });

    if (!doc) {
      return res.status(404).json({ message: "Document is not found" });
    }

    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to delete post" });
  }
});

export { router as PostRouter };
