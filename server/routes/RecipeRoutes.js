const Recipes = require('../models/recipies');

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

  app.post('/recipe', function (req, res) {
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

  
}
