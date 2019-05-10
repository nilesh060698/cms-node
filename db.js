const mongoose=require('mongoose');


mongoose.connect('mongodb://localhost:27017/cms',{useNewUrlParser:true},(err)=>{
  if(!err)
  {
    console.log("mongo db connected");
  }
  else{
    console.log("error in DB connection"+err);
  }
});
require('./cms.model.js')
