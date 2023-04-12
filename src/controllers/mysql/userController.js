import asyncHandler from 'express-async-handler';
import Models from '../../models/mysql/index.js';
const User = Models.User;
const Chat = Models.Chat;
const Wallet = Models.Wallet;
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Validator from 'fastest-validator';
import { Op } from 'sequelize';

// @desc register
// @route POST /api/v1/user/register
// @access Private
// @Author Suvadip Maiti
export const register = asyncHandler(async (req, res) => {
  var username = 'sm' + Date.now();
  var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;
  //validation start
  const validator = new Validator();
  const validationResponse = validator.validate(
    {
      name: name,
      email: email,
      password: password,
    },
    {
      name: { type: 'string', empty: false, max: '100' },
      email: { type: 'email', empty: false, max: '100' },
      password: { type: 'string', empty: false, max: '100' },
    }
  );
  if (validationResponse !== true) {
    return res.status(400).json({
      status: false,
      message: validationResponse[0].message,
    });
  }
  //validation end
  const findUser = await User.findOne({ where: { email: email } });
  if (findUser) {
    return res.status(200).json({
      status: false,
      message: 'User alredy exist',
    });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // create user
  const registerUser = await User.create({
    name: req.body.name,
    username: username,
    email: req.body.email,
    password: hashedPassword,
    role: 1,
  });

  if (registerUser) {
    return res.status(200).json({
      message: 'create user',
      status: true,
      data: {
        id: registerUser.id,
        name: registerUser.name,
        email: registerUser.email,
        token: generateToken(registerUser.id),
      },
    });
  } else {
    return res.status(400).json({
      status: false,
      message: 'Invalid user data',
    });
  }
});

// @desc login
// @route POST /api/v1/user/login
// @access Private
// @Author Suvadip Maiti
export const login = asyncHandler(async (req, res) => {
  console.log(req.body);
  var email = req.body.email;
  var password = req.body.password;
  //validation start
  const validator = new Validator();
  const validationResponse = validator.validate(
    {
      email: email,
      password: password,
    },
    {
      email: { type: 'email', empty: false, max: '100' },
      password: { type: 'string', empty: false, max: '100' },
    }
  );
  if (validationResponse !== true) {
    return res.status(400).json({
      status: false,
      message: validationResponse[0].message,
    });
  }
  //validation end
  const loginUser = await User.findOne({ where: { email: email } });
  if (loginUser) {
    if (await bcrypt.compare(req.body.password, loginUser.password)) {
      const checkWallet = await Wallet.findOne({ where: { userId: loginUser.id } });
      if (!checkWallet?.userId) {
        const newWallet = await Wallet.create({
          userId: loginUser.id,
        });
      }

      return res.status(200).json({
        message: 'login sucessfull',
        status: true,
        data: {
          id: loginUser.id,
          name: loginUser.name,
          username: loginUser.username,
          avatar: loginUser.avatar,
          avatarFullUrl: null,
          email: loginUser.email,
          facebookId: loginUser.facebookId,
          googleId: loginUser.googleId,
          role: loginUser.role,
          token: generateToken(loginUser.id),
        },
      });
    } else {
      return res.status(200).json({
        status: false,
        message: 'Invalid Credential',
      });
    }
  } else {
    return res.status(200).json({
      status: false,
      message: 'Email not exist',
    });
  }
});

// @desc login
// @route POST /api/v1/user/logingoogle
// @access Private
// @Author Suvadip Maiti
export const logingoogle = asyncHandler(async (req, res) => {
  var email = req.body.email;
  var name = req.body.name;
  var token = req.body.token;
  var googleId = req.body.googleId;
  var googleAvatar = req.body.googleAvatar;
  //validation start
  const validator = new Validator();
  const validationResponse = validator.validate(
    {
      email: email,
      name: name,
      token: token,
      googleId: googleId,
    },
    {
      email: { type: 'email', empty: false, max: '100' },
      name: { type: 'string', empty: false, max: '100' },
      token: { type: 'string', empty: false },
      googleId: { type: 'string', empty: false },
    }
  );
  if (validationResponse !== true) {
    return res.status(400).json({
      status: false,
      message: validationResponse[0].message,
    });
  }
  //validation end
  const loginUser = await User.findOne({
    where: { email: email, googleId: googleId },
  });
  if (loginUser) {
    var checkWallet = await Wallet.findOne({ where: { userId: loginUser.id } });
    if (!checkWallet?.userId) {
      const newWallet = await Wallet.create({
        userId: loginUser.id,
      });
    }
    return res.status(200).json({
      message: 'login sucessfull',
      status: true,
      data: {
        id: loginUser.id,
        name: loginUser.name,
        username: loginUser.username,
        avatar: loginUser.avatar,
        avatarFullUrl: loginUser.avatarFullUrl,
        email: loginUser.email,
        facebookId: loginUser.facebookId,
        googleId: loginUser.googleId,
        role: loginUser.role,
        token: generateToken(loginUser.id),
      },
    });
  } else {
    const findUser = await User.findOne({ where: { email: email } });
    if (findUser) {
      return res.status(200).json({
        status: false,
        message: 'User alredy exist',
      });
    }
    var username = 'sm' + Date.now();
    const registerUser = await User.create({
      name: req.body.name,
      username: username,
      email: req.body.email,
      googleId: googleId,
      avatarFullUrl: googleAvatar,
      token: token,
      password: token,
      role: 1,
    });
    return res.status(200).json({
      message: 'login sucessfull',
      status: true,
      data: {
        id: registerUser.id,
        name: registerUser.name,
        username: registerUser.username,
        avatar: registerUser.avatar,
        avatarFullUrl: registerUser.avatarFullUrl,
        email: registerUser.email,
        facebookId: registerUser.facebookId,
        googleId: registerUser.googleId,
        role: registerUser.role,
        token: generateToken(registerUser.id),
      },
    });
  }
});

// @desc login
// @route POST /api/v1/user/loginfacebook
// @access Private
// @Author Suvadip Maiti
export const loginfacebook = asyncHandler(async (req, res) => {
  var email = req.body.email;
  var name = req.body.name;
  var token = req.body.token;
  var facebookId = req.body.facebookId;
  var facebookAvatar = req.body.facebookAvatar;
  //validation start
  const validator = new Validator();
  const validationResponse = validator.validate(
    {
      email: email,
      name: name,
      token: token,
      facebookId: facebookId,
    },
    {
      email: { type: 'email', empty: false, max: '100' },
      name: { type: 'string', empty: false, max: '100' },
      token: { type: 'string', empty: false },
      facebookId: { type: 'string', empty: false },
    }
  );
  if (validationResponse !== true) {
    return res.status(400).json({
      status: false,
      message: validationResponse[0].message,
    });
  }
  //validation end
  const loginUser = await User.findOne({
    where: { email: email, facebookId: facebookId },
  });
  if (loginUser) {
    checkWallet = await Wallet.findOne({ where: { userId: loginUser.id } });
    if (!checkWallet?.userId) {
      const newWallet = await Wallet.create({
        userId: loginUser.id,
      });
    }

    return res.status(200).json({
      message: 'login sucessfull',
      status: true,
      data: {
        id: loginUser.id,
        name: loginUser.name,
        username: loginUser.username,
        avatar: loginUser.avatar,
        avatarFullUrl: loginUser.avatarFullUrl,
        email: loginUser.email,
        facebookId: loginUser.facebookId,
        googleId: loginUser.googleId,
        role: loginUser.role,
        token: generateToken(loginUser.id),
      },
    });
  } else {
    const findUser = await User.findOne({ where: { email: email } });
    if (findUser) {
      return res.status(200).json({
        status: false,
        message: 'User alredy exist',
      });
    }
    var username = 'sm' + Date.now();
    const registerUser = await User.create({
      name: req.body.name,
      username: username,
      email: req.body.email,
      facebookId: facebookId,
      avatarFullUrl: facebookAvatar,
      token: token,
      password: token,
      role: 1,
    });
    return res.status(200).json({
      message: 'login sucessfull',
      status: true,
      data: {
        id: registerUser.id,
        name: registerUser.name,
        username: registerUser.username,
        avatar: registerUser.avatar,
        avatarFullUrl: registerUser.avatarFullUrl,
        email: registerUser.email,
        facebookId: registerUser.facebookId,
        googleId: registerUser.googleId,
        role: registerUser.role,
        token: generateToken(registerUser.id),
      },
    });
    
  }
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
};

// @desc auth
// @route GET /api/v1/user/auth
// @access Private
// @Author Suvadip Maiti
export const auth = asyncHandler(async (req, res) => {
  if (req.user && req.user.id && req.token) {
    const auth = await User.findOne({ where: { id: req.user.id } });
    if (auth) {
      return res.status(200).json({
        message: `show auth data`,
        status: true,
        token: req.token,
        data: {
          id: auth.id,
          name: auth.name,
          username: auth.username,
          avatar: auth.avatar,
          avatarFullUrl: auth.avatarFullUrl,
          email: auth.email,
          facebookId: auth.facebookId,
          googleId: auth.googleId,
          role: auth.role,
          token: req.token,
        },
      });
    } else {
      return res.status(200).json({
        message: `Not Authorized`,
        status: false,
      });
    }
  } else {
    return res.status(200).json({
      message: `Not Authorized`,
      status: false,
    });
  }
});

// @desc all users
// @route GET /api/v1/users
// @access Private
// @Author Suvadip Maiti
export const allUsers = asyncHandler(async (req, res) => {
  const users = await User.findAll();
  return res.status(200).json({
    message: 'all users',
    status: true,
    data: users,
  });
});

// @desc show user
// @route GET /api/v1/user/show/:id
// @access Private
// @Author Suvadip Maiti
export const showUser = asyncHandler(async (req, res) => {
  const user = await User.findOne({ where: { id: req.params.id } });
  return res.status(200).json({
    message: `show user ${req.params.id}`,
    status: true,
    data: user,
  });
});

// @desc show user contact list
// @route POST /api/v1/user/contact
// @access Private
// @Author Suvadip Maiti
export const userContactList = asyncHandler(async (req, res) => {
  const id = req.body.id;
  const searchContact = req.body.searchContact;
  if (searchContact) {
    const users = await User.findAll({
      where: {
        id: { [Op.ne]: id },
        [Op.or]: [{ username: { [Op.like]: '%' + searchContact + '%' } }],
        [Op.or]: [{ name: { [Op.like]: '%' + searchContact + '%' } }],
        [Op.or]: [{ email: { [Op.like]: '%' + searchContact + '%' } }],
      },
    });

    if (users) {
      return res.status(200).json({
        message: `show user contact list`,
        data: users,
        status: true,
      });
    } else {
      return res.status(200).json({
        message: `show user contact list not found`,
        status: false,
      });
    }
  } else {
    const users = await User.findAll({
      include: [
          {
            model: Models.Chat,
            as: 'hasManyChat',
            where: {
              sender: id,
            },
          },
       ],
    });

    if (users) {
      return res.status(200).json({
        message: `show user contact list`,
        data: users,
        status: true,
      });
    } else {
      return res.status(200).json({
        message: `show user contact list not found`,
        status: false,
      });
    }
  }
});

// @desc create user
// @route POST /api/v1/user
// @access Private
// @Author Suvadip Maiti
export const createUser = asyncHandler(async (req, res) => {
  var username = 'sm' + Date.now();
  var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;
  //validation start
  const validator = new Validator();
  const validationResponse = validator.validate(
    {
      name: name,
      email: email,
      password: password,
    },
    {
      name: { type: 'string', empty: false, max: '100' },
      email: { type: 'email', empty: false, max: '100' },
      password: { type: 'string', empty: false, max: '100' },
    }
  );
  if (validationResponse !== true) {
    return res.status(400).json({
      status: false,
      message: validationResponse[0].message,
    });
  }
  //validation end
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const newUser = await User.create({
    name: name,
    username: username,
    email: email,
    password: hashedPassword,
    role: 1,
  });
  return res.status(200).json({
    message: 'create user',
    data: newUser,
  });
});

// @desc update user
// @route PUT /api/v1/user/:id
// @access Private
// @Author Suvadip Maiti
export const updateUser = asyncHandler(async (req, res) => {
  const findUser = await User.findOne({ where: { id: req.params.id } });
  if (!findUser) {
    return res.status(200).json({
      status: false,
      message: 'User not found',
    });
  }
  var name = req.body.name;
  var avatarName = null;
  if (req.files && req.files.avatar) {
    var avatarFile = req.files.avatar;
    avatarName = avatarFile.name;
    avatarFile.mv(
      'src/public/uploads/avatar/' + avatarFile.name,
      function (err) {
        if (err) {
          res.status(400).json({
            status: false,
            message: 'File not uploaded',
          });
        } else {
          avatarName = avatarFile.name;
        }
      }
    );
  }
  //validation start
  const validator = new Validator();
  const validationResponse = validator.validate(
    {
      name: name,
    },
    {
      name: { type: 'string', empty: false, max: '100' },
    }
  );
  if (validationResponse !== true) {
    return res.status(400).json({
      status: false,
      message: validationResponse[0].message,
    });
  }
  //validation end
  const updateUserData = {
    name: name,
    avatar: avatarName ? avatarName : findUser.avatar,
  };
  let updateUser = await Models.User.update(updateUserData, {
    where: { id: req.params.id },
  });

  const updatedUser = await User.findOne({ where: { id: req.params.id } });
  return res.status(200).json({
    message: `update users ${req.params.id}`,
    status: true,
    data: {
      id: updatedUser.id,
      name: updatedUser.name,
      username: updatedUser.username,
      avatar: updatedUser.avatar,
      avatarFullUrl: false,
      email: updatedUser.email,
      token: req.token,
    },
  });
});

// @desc all users
// @route DELETE /api/v1/user/:id
// @access Private
// @Author Suvadip Maiti
export const deleteUser = asyncHandler(async (req, res) => {
  const findUser = await User.findOne({ where: { id: req.params.id } });
  if (!findUser) {
    return res.status(200).json({
      status: false,
      message: `User not found`,
    });
  }
  await findUser.destroy();
  return res.status(200).json({
    message: `delete users ${req.params.id}`,
    data: req.params.id,
  });
});


