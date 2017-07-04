const Authentication = require('../auth/auth');
const passportService = require('../auth/passport');
const passport = require('passport');
const multer = require('multer');
const fs = require('fs');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });
const User = require('../models/user');

const storage = multer.diskStorage({
  destination: __dirname +'/media/',
  filename(req, file, cb) {
    console.log(file);
    cb(null, `${new Date()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

module.exports = function (app) {

  app.get('/user',requireAuth, function (req, res) {
    User.findOne({uname:req.query.uname},(err,user)=>{
         if (err) { return next(err); }
         res.json(user);
       });
  });

  app.get('/users',requireAuth, function (req, res) {
    User.find({},(err,users)=>{
         if (err) { return next(err); }
         res.json(users);
       });
  });

  app.put('/user',requireAuth, function (req, res) {
    // User.findOne({uname:req.body.uname},(err,user)=>{
    //   if (err) { return next(err); }
    //   user.fname=req.body.fname;
    //   user.lname=req.body.lname;
    //   user.image=req.body.image;
    //   user.save(function (err,newuser) {
    //     if (err) { return next(err); }
    //     res.json(newuser);
    //   });
    //
    // });
    let user={};
    let data=[];

    for(var key in req.body) {
      if(req.body.hasOwnProperty(key) && req.body[key] !== undefined && key !== 'uname' && key !== '_id'){
          user[key]=req.body[key];
      }
    }
    User.findOneAndUpdate({uname:req.body.uname},user,{ "new": true })
      .then((usr)=>res.json(usr))
      .then((err)=>next(err));
  });


  app.post('/usrfile',[requireAuth,upload.single('file')], function(req, res) {
      let file = __dirname + '/media/' +req.body.filename+'.'+req.file.mimetype.substring(6);
      console.log(file);
        fs.rename(req.file.path, file, function(err) {
          if (err) {
            console.log(err);
            res.send(500);
          } else {
            res.json({
              message: 'File uploaded successfully',
              filename: req.file.filename
            });
          }
        });
  });

}
