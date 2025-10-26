const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../utils/authMiddleware');

const router = express.Router();
const jwtSecret = process.env.JWT_SECRET || 'devsecret';

router.post('/register', async (req,res)=>{
  const { username,email,password } = req.body;
  try {
    const hash = await bcrypt.hash(password,10);
    const user = await User.create({ username,email,passwordHash:hash });
    const token = jwt.sign({ id:user._id }, jwtSecret,{expiresIn:'7d'});
    res.json({ token, user:{ id:user._id, username } });
  } catch(err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/login', async (req,res)=>{
  const { username,password } = req.body;
  const user = await User.findOne({ username });
  if(!user) return res.status(401).json({ error:'Invalid credentials' });
  const ok = await bcrypt.compare(password,user.passwordHash);
  if(!ok) return res.status(401).json({ error:'Invalid credentials' });
  const token = jwt.sign({ id:user._id }, jwtSecret,{expiresIn:'7d'});
  res.json({ token, user:{ id:user._id, username:user.username } });
});

module.exports = router;
