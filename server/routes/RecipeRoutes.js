const Authentication = require('../auth/auth');
const passportService = require('../auth/passport');
const passport = require('passport');
const multer = require('multer');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

const Recipes = require('../models/recipies');

const storage = multer.diskStorage({
  destination: '../media',
  filename(req, file, cb) {
    cb(null, `${new Date()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

module.exports = function (app) {

  app.get('/recipe', function (req, res) {
     Recipes.findOne({fname:req.query.fname},(err,rec)=>{
          if (err) { return next(err); }
          res.json(rec);
        });
  });

  app.get('/recipes', function (req, res) {
      User.find({type:req.query.type},(err,user)=>{
        if (err) { return next(err); }
        res.json(user);
      });
  });

  app.post('/recipe',requireAuth, function (req, res) {
      const recipe = new Recipes({
        creator:req.body.creator,
        fname:req.body.fname,
        type:req.body.type,
        image:req.body.image,
        description:req.body.description,
      });
        recipe.save((err,rec)=>{
        if (err) { return next(err); }
          res.json(rec);
    });
  });

  app.put('/recipe', function (req, res) {
      User.findOne({fname:req.query.fname},(err,rec)=>{
        if (err) { return next(err); }
        rec.fname=req.query.fname;
        rec.type=req.query.type;
        rec.description=req.query.description;

          rec.save(function (err,newrec) {
            if (err) { return next(err); }
            res.json(newrec);
          });

      });
  });

  app.post('/file',upload.single('file'), function(req, res) {
      var file = __dirname + '/' + req.file.filename;
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
