const Authentication = require('../auth/auth');
const passportService = require('../auth/passport');
const passport = require('passport');
const multer = require('multer');
const ObjectId = require('mongodb').ObjectID;
const fs = require('fs');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

const Recipes = require('../models/recipies');
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

  app.get('/recipe',requireAuth, function (req, res) {
     Recipes.find({fname:req.query.fname},(err,rec)=>{
          if (err) { return next(err); }
          console.log(rec);
          res.json(rec);
        });
  });

  app.get('/myrecipes',requireAuth, function (req, res) {
     Recipes.find({fname:req.query.fname,creator:req.query.creator},(err,rec)=>{
          if (err) { return next(err); }
          console.log(rec);
          res.json(rec);
        });
  });


  app.get('/recipes',requireAuth, function (req, res) {
      Recipes.find({},(err,user)=>{
        if (err) { return next(err); }
        res.json(user);
      });
  });

  app.get('/myrecipe',requireAuth, function (req, res) {
    console.log(req.query.uname);
     Recipes.find({creator:req.query.uname},(err,rec)=>{
          if (err) { return next(err); }
          res.json(rec);
        });
  });

  app.post('/recipe',requireAuth, function (req, res) {

      User.findOne({uname:req.body.creator},(err,user)=>{
          if (err) { return next(err); }
          const recipe = new Recipes({
            cname:user.fname,
            cimage:user.image,
            creator:req.body.creator,
            fname:req.body.fname,
            type:req.body.type,
            image:req.body.image,
            description:req.body.desc,
          });
            recipe.save((err,rec)=>{
            if (err) { return next(err); }
            res.json(rec);
      });

    });
  });

  app.delete('/recipe', function (req, res) {
      Recipes.find({_id:req.body.id}).remove().exec((err,rec)=>{
        if (err) { return next(err); }
        res.json(rec);
      });
  });

  app.put('/recipe', function (req, res,next) {
      // Recipes.findOne({fname:req.body.fname},(err,rec)=>{
      //   if (err) { return next(err); }
      //   rec.fname=req.body.fname;
      //   rec.type=req.body.type;
      //   rec.description=req.body.description;
      //
      //     rec.save(function (err,newrec) {
      //       if (err) { return next(err); }
      //       res.json(newrec);
      //     });
      //
      // });
      // let recipe;
      //
      // for(var key in req.body) {
      //   if(req.body.hasOwnProperty(key) && req.body.key.length!=0){
      //       recipe[key]=req.body.key;
      //   }
      // }
      //
      // Recipes.findByIdAndUpdate(req.body._id,recipe)
      //   .then((rec)=>res.json(rec))
      //   .then((err)=>next(err));

        let recipe={};
        let data=[];

        for(var key in req.body) {
          if(req.body.hasOwnProperty(key) && req.body[key] !== undefined && key !== 'uname' && key !== 'id'){
              recipe[key]=req.body[key];
          }
        }

          Recipes.findOneAndUpdate({_id:req.body.id},recipe,{ "new": true })
            .then((rec)=>{console.log('menna',rec);res.send(rec);})
            .then((err)=>next(err));

  });

  app.post('/recfile',[requireAuth,upload.single('file')], function(req, res) {
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
