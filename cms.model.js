const mongoose=require('mongoose');

var postSchema=new mongoose.Schema({
   title: {
     type:String
   },
   author:{
    type:String
   },
   description:{
    type:String
   }

});

var usersSchema=new mongoose.Schema({
  userName:{
    type:String,

  },
  email:{
    type:String,
    
  },
  password:{
    type:String
  }
});
mongoose.model('user',usersSchema);
mongoose.model('post',postSchema);
