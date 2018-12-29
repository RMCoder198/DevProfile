const express = require('express');
const router  = express.Router();
const User  = require('../../models/User');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
//@route GET api/posts

//@ Test

router.get('/test',(req,res)=> res.json({message:"Test API works"}));

module.exports = router;