import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/config.js'

export default class User extends Model {}

User.init(
  {
    // Model attributes are defined here
    name: {
      type: DataTypes.STRING,
    },
    email: {
    type: DataTypes.STRING,
    },
    password: {
    type: DataTypes.STRING,
    },
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'User', // We need to choose the model name
  },
);