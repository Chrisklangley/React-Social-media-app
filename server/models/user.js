const sequelize = require("../util/database").sequelize;
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

  username: DataTypes.STRING,

  hashedPass: DataTypes.STRING,
});

module.exports = {
  User,
};
