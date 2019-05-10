const express=require('express');
const path=require('path');
require('./db.js');
const mongoose = require('mongoose');
const postData=mongoose.model('post');
const userData=mongoose.model('user');
var session = require('express-session');

// var router=express.Router();
// cmsController=require('./cms.controller.js');
var app=express();
const exphbs=require('express-handlebars');
const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({
  extended:true
}));



app.use(bodyParser.json());
app.use(express.static(__dirname + '/views/'));
app.use(session({secret: 'ssshhhhh'}));
var sess;



app.set('views',path.join(__dirname,'/views/'));
app.engine('hbs',exphbs({extname:'hbs'}));
// exphbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');

app.listen(3000,()=>{
  console.log('server is ruuning on port:3000');
});
// app.use('/',cmsController);

app.get('/',(req,res)=>{
   sess = req.session;

   if(req.session.name)
   {
     postData.find((err,docs)=>{
    if(!err){
        console.log("everything went great");
        console.log(sess.name);
      res.render('index',{
        postData:docs,
        isLoggedIn:true,
        logOut:true,
        user:req.session.name



      });
   }
 });
 }
 else {
    loadPost(req,res);
 }



});


app.get('/addPost',(req,res)=>{
  res.render('addPost');
});
app.post('/addPost',(req,res)=>{
console.log(req.body);
 var postDatas=new postData();
postDatas.title=req.body.title;
postDatas.author=req.body.author;
postDatas.description=req.body.description;
postDatas.save((err,doc)=>{
  if(!err){
    console.log("data inserted");
    res.redirect('/');
  }
  else {
    res.send("userName Already exist")
  }
});

});

app.get('/registration',(req,res)=>{
  res.render('registration');
});

app.post('/registration',(req,res)=>{

   userData.find({userName:req.body.username},(err,doc)=>{

        if(doc.length)
        {

         }
        else {

          console.log(req.body);
          var usersData=new userData();
          usersData.userName=req.body.username;
          usersData.email=req.body.email;
          usersData.password=req.body.password;

          usersData.save((err,doc)=>{
            if(!err){
              console.log("user data inserted");
            }
            else{
              console.log(err);
            }
          });
          res.redirect('/');
        }
     if(err)
     {
       console.log(err);
     }

});
});


app.post('/',(req,res)=>{
     console.log(req.body);
    userData.find({
      userName:req.body.username,
      password:req.body.password


    },(err,doc)=>{
      if(doc.length)
      {
        req.session.name=req.body.username;
        postData.find((err,docs)=>{
       if(!err){
           console.log("everything went great");
           console.log(req.session.name);
         res.render('index',{
           postData:docs,
           isLoggedIn:true,
           logOut:true,
           user:req.session.name

         });
      }
       else{
         // console.log(err);
         res.redirect('/');
       }
      }
      );
      }
      else {
          res.redirect('/');
          console.log("no user exist");

      }
    });

});
function loadPost(req,res){

  postData.find((err,docs)=>{
 if(!err){
     console.log("everything went great");
   res.render('index',{
     postData:docs,
     isLoggedInSidebar:true



   });
}
 else{
   console.log(err);
 }
}
);
}

app.get('/logout',(req,res)=>{
  req.session.destroy();
     res.redirect('/')

   });
