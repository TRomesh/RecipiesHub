
module.exports = function (app) {

  app.get('/recipe', function (req, res) {
    res.send({ data: 'get recipe' });
  });

  app.post('/recipe', function (req, res) {
    res.send({ data: 'post recipe' });
  });

  app.put('/recipe', function (req, res) {
    res.send({ data: 'put recipe' });
  });

}
