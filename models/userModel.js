const { DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");
const database = require("../config/db");

class User {
  constructor() {
    this.model = database.sequelize.define("User", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  }

  async createUser(name, email, password) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await this.model.create({
        name,
        email,
        password: hashedPassword,
      });
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getAllUsers() {
    try {
      const users = await this.model.findAll();
      return users;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async checkPassword(inputPassword, storedPassword) {
    return bcrypt.compare(inputPassword, storedPassword);
  }

  async countUsers() {
    return this.model.count(); // Devuelve la cantidad de usuarios en la tabla
  }
}

const userInstance = new User();
module.exports = userInstance;
