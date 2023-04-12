import dotenv from 'dotenv';
dotenv.config();
const dbConfig =  {
  HOST: 'localhost',
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
  DB: process.env.DB_DB,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  }
};

export default dbConfig 