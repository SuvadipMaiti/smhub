import Sequelize from 'sequelize';
import dbConfig from '../../config/db.config.js';
import userModel from './userModel.js';
import walletModel from './walletModel.js';

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
  logging: false,
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.User = userModel(sequelize, Sequelize);
db.Wallet = walletModel(sequelize, Sequelize);






export default db;
