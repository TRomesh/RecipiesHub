const Authentication = require('../auth/auth');
const passportService = require('../auth/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function (app) {

  app.get('/hi',function (req, res) {
    res.send({ hi: 'there' });
  });

  app.get('/signin', requireSignin, Authentication.signin);

  app.get('/register', Authentication.signup);

}
