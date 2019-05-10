const express=require('express');
var router=express.Router();
const mongoose=require('mongoose');
const post=mongoose.model('post');


router.get('/',(req,res)=>{
  res.render('index');
})
