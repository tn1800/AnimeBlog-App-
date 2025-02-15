const express = require('express'); 
const cors = require('cors'); 
const mongoose = require("mongoose"); 
const User = require('./models/User')
const bcrypt = require('bcryptjs'); 
const app = express(); 
const jwt = require('jsonwebtoken')

const salt = bcrypt.genSaltSync(10); 
const secret = 'loldsodoaosaoao'; 

app.use(cors({credentials:true,origin:'http://localhost:3000'}));
app.use(express.json()); 

mongoose.connect('mongodb+srv://tristanengo:Binjax12!@cluster0.t2mtq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'); 

app.post('/register', async (req,res) => {
    const {username,password} = req.body;
    try{
      const userDoc = await User.create({
        username,
        password:bcrypt.hashSync(password,salt),
      });
      res.json(userDoc);
    } catch(e) {
      console.log(e);
      res.status(400).json(e);
    }
  });
app.post('/login', async (req,res) => {
    const {username,password} = req.body;
    const userDoc = await User.findOne({username});
    const pass_true = bcrypt.compareSync(password, userDoc.password);
    if (pass_true) {
      jwt.sign({username,id:userDoc._id}, secret, {}, (err,token) => {
        if (err) throw err;
        res.cookie('token', token).json({
          id:userDoc._id,
          username,
        });
      });
    } else {
      res.status(400).json('Username/Password Incorrect!');
    }
  });


app.listen(4000); 
///mongodb+srv://tristanengo:Binjax12!@cluster0.t2mtq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0