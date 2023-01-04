// import express from 'express';
const express=require('express')
// import User from '../models/userModel';
const User=require('../models/userModel')
// import { getToken, isAuth } from '../util';
const { getToken, isAuth }=require('../util')


const router = express.Router();

router.put('/:id', isAuth, async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.password = req.body.password || user.password;
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: getToken(updatedUser),
    });
  } else {
    res.status(404).json({ message: 'User Not Found' });
  }
});

router.post('/signin', async (req, res) => {
  const signinUser = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  if (signinUser) {
    res.json({
      _id: signinUser.id,
      name: signinUser.name,
      email: signinUser.email,
      isAdmin: signinUser.isAdmin,
      token: getToken(signinUser),
    });
  } else {
    res.status(401).json({ message: 'Invalid Email or Password.' });
  }
});

router.post('/register', async (req, res) => {
  const oldUser=await User.findOne({email:req.body.email})
  if(oldUser){
    res.status(409).json({message:"An account with this email has already been registered"})
  }
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  const newUser = await user.save();
  if (newUser) {
    res.json({
      _id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
      token: getToken(newUser),
    });
  } else {
    res.status(401).json({ message: 'Invalid User Data.' });
  }
});

router.get('/createadmin', async (req, res) => {
  try {
    const user = new User({
      name: 'Uday',
      email: 'udayrana428@gmail.com',
      password: '12345678',
      isAdmin: true,
    });
    const newUser = await user.save();
    res.json(newUser);
  } catch (error) {
    res.json({ message: error.message });
  }
});
module.exports=router
// export default router;
