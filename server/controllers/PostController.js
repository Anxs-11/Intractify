import PostModel from "../models/postModel.js";
import mongoose from "mongoose";
import UserModel from "../models/userModel.js";

// Creat new Post
export const createPost = async (req, res) => {
  const newPost = new PostModel(req.body);

  try {
    await newPost.save();
    res.status(200).json(newPost);
  } catch (error) {
    res.status(500).json(error);
  }
};
// Get a post

export const getPost = async (req, res) => {
  const id = req.params.id;

  try {
    const post = await PostModel.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};
// Update a post
export const updatePost = async (req, res) => {
  const postId = req.params.id;
  const { userId } = req.body;

  try {
    const post = await PostModel.findById(postId);
    if (post.userId === userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("Post Updated");
    } else {
      res.status(403).json("Action forbidden");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// Delete a post
export const deletePost = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;

  try {
    const post = await PostModel.findById(id);
    if (post.userId === userId) {
      await post.deleteOne();
      res.status(200).json("Post deleted successfully");
    } else {
      res.status(403).json("Action forbidden");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
// like/dislike a post
export const likePost = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;

  try {
    const post = await PostModel.findById(id);
    if (!post.likes.includes(userId)) {
      await post.updateOne({ $push: { likes: userId } });
      res.status(200).json("Post liked");
    } else {
      await post.updateOne({ $pull: { likes: userId } });
      res.status(200).json("Post Unliked");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get Timeline POsts- showing post of mine + of my followings
export const getTimelinePosts = async (req, res) => {
  const userId = req.params.id;

  try {
    const currentUserPosts = await PostModel.find({ userId: userId });
    const followingPosts = await UserModel.aggregate([
      // we use aggregate when we interact with one model and want result from another model 
      // like here we are dealing with user model but also wants posts of my followings from post model
      {
        $match: {
          // finding userid in usermodel first
          _id: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          // after matching we want to go in its following array and userid in that array which 
          // match with created id in post that post gets stored in array following post
          from: "posts",
          localField: "following",
          foreignField: "userId",
          as: "followingPosts",
        },
      },
      {
        $project: { // project means what u want to return , we want to return followingpost array ,
          // by default it returns _id also to ngelect it we write 0
          followingPosts: 1,
          _id: 0,
        },
      },
    ]);

    res
      .status(200)
      .json(currentUserPosts.concat(followingPosts[0].followingPosts) // combining both in one array
        .sort((a, b) => {
          return b.createdAt - a.createdAt; // gets sorted in desc created time order recently created appeard on top
        })
      );
  } catch (error) {
    res.status(500).json(error);
  }
};
