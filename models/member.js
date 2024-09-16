import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/config.js'

export default class Member extends Model {}

Member.init(
  {
    // Model attributes are defined here
    name: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    email: {
    type: DataTypes.STRING,

    },
    phone: {
    type: DataTypes.STRING,
    },
    url: {
    type: DataTypes.STRING,
    },
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'Member', // We need to choose the model name
  },
);
