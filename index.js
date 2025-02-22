  const mongoose =require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/user_mangement_system");

const express =require("express");
const app = express();
const path = require('path');


// app.use(express.static(path.join(__dirname,'public')))
app.use(express.static('public'))
app.use('static',express.static(path.join(__dirname,'public/images')))



const nocache = require("nocache");
app.use(nocache());

// for user routes
const userRoute = require('./routes/userRoute');
app.use('/',userRoute);


// for Admin routes
const adminRoute = require('./routes/adminRoute.js');
app.use('/admin',adminRoute);


app.listen(5000,()=>{
      console.log("http://localhost:5000");
})