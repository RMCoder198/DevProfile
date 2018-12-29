const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport  = require('passport');
const db = require('./config/key').mongoUri;
const users = require('./routes/api/users.js');
const profile = require('./routes/api/profile.js');
const posts = require('./routes/api/posts.js');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/api/users',users);
app.use('/api/profile',profile);
app.use('/api/posts',posts);

mongoose.connect(db).then(()=> console.log("mongodb connected")).catch( err => console.log(err));

//passport middleware

app.use(passport.initialize());

//passport config
require('./config/passport')(passport);

const port = process.env.PORT || 5000;

app.listen(port,()=> console.log(`Server is running on port ${port}`));