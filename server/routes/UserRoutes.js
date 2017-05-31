
module.exports = function (app) {

  app.get('/user', function (req, res) {
    res.send({ data: 'Get user' });
  });

  app.post('/user', function (req, res) {
    res.send({ data: 'Post user' });
  });

  app.put('/user', function (req, res) {
    res.send({ data: 'Put user' });
  });

}
