
module.exports = function (app) {

  app.get('/Signin', function (req, res) {
    res.send({ data: 'Logged in' });
  });

  app.get('/Signup', function (req, res) {
    res.send({ data: 'Sinuped' });
  });

}
