
module.exports = function (app) {

  app.get('/login', function (req, res) {
    res.send({ data: 'Logged in' });
  });

  app.get('/signup', function (req, res) {
    res.send({ data: 'Sinuped' });
  });

}
