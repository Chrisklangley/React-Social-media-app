const { User } = require("../models/user");
const { Post } = require("../models/post");

module.exports = {
  getAllPosts: async (req, res) => {
    try {
      const posts = await Post.findAll({
        where: { privateStatus: false },
        include: [
          {
            model: User,
            required: true,
            attributes: [`username`],
          },
        ],
      });
      res.status(200).send(posts);
    } catch (error) {
      console.log("ERROR IN getAllPosts");
      console.log(error);
      res.sendStatus(400);
    }
  },
  getCurrentUserPosts: async (req, res) => {
    try {
      const posts = await Posts.findAll({
        where: { privateStatus: false },
        include: [
          {
            model: User,
            required: true,
            attributes: [`username`],
          },
        ],
      });
      res.status(200).send(posts);
    } catch (error) {
      console.log("ERROR IN getAllPosts");
      console.log(error);
      res.sendStatus(400);
    }
  },
  addPost: async (req, res) => {
    try {
      const { title, content, status, userId } = req.body;

      console.log(req.body);
      await Post.create({ title, content, privateStatus: status, userId });
      res.sendStaus(200);
    } catch (error) {
      console.log("Unable to add post");
      console.error(error);
      res.sendStaus(400);
    }
  },
  editPost: (req, res) => {},
  deletePost: (req, res) => {
    console.log(`delete post`);
  },
};
