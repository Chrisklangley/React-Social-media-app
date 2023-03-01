const sequelize = require("../util/database").sequelize;
const { DataTypes } = require("sequelize");

const Post = sequelize.define("post", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
  },
  content: {
    type: DataTypes.STRING,
  },
  privateStatus: {
    type: DataTypes.BOOLEAN,
  },
});

module.exports = {
  Post,
};
