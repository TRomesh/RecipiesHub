const User = require('../models/user');

module.exports = function (app) {

  app.get('/user', function (req, res) {
    User.findOne({fname:req.query.fname},(err,user)=>{
         if (err) { return next(err); }
         res.json(user);
       });
  });

  app.get('/users', function (req, res) {
    User.find({},(err,users)=>{
         if (err) { return next(err); }
         res.json(users);
       });
  });

  app.put('/user', function (req, res) {
    User.findOne({fname:req.query.fname},(err,user)=>{
      if (err) { return next(err); }
      user.fname=req.query.fname;
      user.lname=req.query.lname;
      user.uname=req.query.uname;
      user.save(function (err,newuser) {
        if (err) { return next(err); }
        res.json(newuser);
      });

    })
  });

}
