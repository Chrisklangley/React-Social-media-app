require("dotenv").config();
const { sequelize } = require("./util/database");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
const { Post } = require("./models/post");
const { User } = require("./models/user");

const { PORT } = process.env;
const {
  getAllPosts,
  getCurrentUserPosts,
  addPost,
  editPost,
  deletePost,
} = require("./controllers/posts");
const { register, login } = require("./controllers/auth");
const { isAuthenticated } = require("./middleware/isAuthenticated");

User.hasMany(Post);
Post.belongsTo(User);

app.post("/register", register);
app.post("/login", login);

app.get("/posts", getAllPosts);

app.get("/userposts/:userId", getCurrentUserPosts);
app.post("/posts", isAuthenticated, addPost);
app.put("/posts/:id", isAuthenticated, editPost);
app.delete("/posts/:id", isAuthenticated, deletePost);

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
  })
  .catch((error) => console.log(error));
