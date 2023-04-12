import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import fileUpload from 'express-fileupload';
import dotenv from 'dotenv';
dotenv.config();

import MYSQLuserRouter from './src/routes/mysql/userRouter.js';

import MONGOuserRouter from './src/routes/mongodb/userRouter.js';

const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(fileUpload());
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'PUT', 'DELETE', 'PATCH', 'POST'],
    allowedHeaders:
      'Content-Type, Authorization, Origin, X-Requested-With, Accept',
  })
);

//public uploads
app.use('/uploads', express.static('src/public/uploads'));


app.get('/', function (req, res) {
    return res.status(200).json({
      status: true,
      message: 'Api working',
      userlogin: `${process.env.SERVER_URL}/api/${process.env.API_VERSION}/user/login`,
    });
  });
  
  /* ROUTES */
  if (process.env.DB_TYPE == 'MYSQL') {
    app.use(`/api/${process.env.API_VERSION}/user`, MYSQLuserRouter);
  }
  if (process.env.DB_TYPE == 'MONGO') {
    app.use(`/api/${process.env.API_VERSION}/user`, MONGOuserRouter);
  }

export default app