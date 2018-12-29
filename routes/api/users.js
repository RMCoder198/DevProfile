const express = require('express');
const router  = express.Router();
const User  = require('../../models/User');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/key');
const passport = require('passport');
const validateRegisterInput = require('../../validation/registerValid');
const validateLoginInput = require('../../validation/loginValidation');

//@route GET api/users

//@ Test

router.get('/test',(req,res)=> res.json({message:"Test API works"}));




//@ desc Register user details

router.post('/register',(req,res)=>{

   const { errors, isValid } = validateRegister(req.body);

   if(!isValid){
   	return 	res.status(400).json(errors);
   }

  User.findOne({email:req.body.email})
      .then(user=>{
      	if(user){
      		errors.email = 'Email already exist';
      		return res.status(400).json(errors);
      	} else{
      		const avatar = gravatar.url(req.body.email,{
             s:'200',
             r:'pg',
             d:'mm'
      		});
      		const newUser  = new User({
              name:req.body.name,
              email:req.body.email,
              avatar,
              password:req.body.password
      		});
      		bcrypt.genSalt(10,(err,salt)=>{
      			bcrypt.hash(newUser.password,salt,(err,hash)=>{
      				// if(err) throw err;
      			 
      				newUser.password = hash;
      				newUser.save()
      				       .then(user=>res.json(user))
      				       .catch(err => console.log(err));
      			})
      		})
      	}

      });
});


// desc Login user

router.post('/login',(req,res)=>{
	   const { errors, isValid } = validateLoginInput(req.body);

   if(!isValid){
   	return 	res.status(400).json(errors);
   }
  const email = req.body.email;
  const password = req.body.password; 
  User.findOne({email}).then(
  	user=>{
      if(!user){
      	errors.email = 'User not found';
      	return res.status(404).json(errors);
      } 
      bcrypt.compare(password,user.password).then( match=>
      {
      	if(match){
             const payload = {id:user.id, email:user.email};
             jwt.sign(payload,keys.secretKey,{expiresIn:3600},
             	(err,token)=>{
             		res.json({
             			success:true,
             			token:'Bearer '+ token
             		});
             	});
       	} else{
       		errors.password = 'Incorrect password';
      		return res.status(400).json(errors);
      	}
      })
  	});

 
});


// desc return current user 

router.get('/current',passport.authentication('jwt',{session:false}),
    (req,res)=>{
    	res.json({
    		id:req.user.id,
    		name:req.user.name,
    		email:req.user.email
    	});
    }
	);

module.exports =router;