import express from 'express';
import {register,login,loginfacebook,logingoogle,auth,allUsers,showUser,userContactList,createUser,updateUser,deleteUser} from '../../controllers/mysql/userController.js';
import  authProtected  from '../../middlewares/mysql/authMiddleware.js';


const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/loginfacebook',loginfacebook);
router.post('/logingoogle',logingoogle);
router.get('/auth', authProtected, auth);

router.get('/', authProtected, allUsers);
router.get('/show/:id', authProtected, showUser);
router.post('/contact', authProtected, userContactList);
router.post('/', authProtected, createUser);
router.put('/:id', authProtected, updateUser);
router.delete('/:id', authProtected, deleteUser);


export default router;