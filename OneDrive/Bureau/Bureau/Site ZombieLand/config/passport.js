const { Strategy: LocalStrategy } = require('passport-local');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const { Utilisateur } = require('../src/models');
const bcrypt = require('bcryptjs');

module.exports = (passport) => {
  passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
      const utilisateur = await Utilisateur.findOne({ where: { email } });
      if (!utilisateur || !(await bcrypt.compare(password, utilisateur.mot_de_passe))) {
        return done(null, false, { message: 'Combinaison email/mot de passe incorrecte' });
      }
      return done(null, utilisateur);
    } catch (error) {
      return done(error);
    }
  }));

  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
  };

  passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const utilisateur = await Utilisateur.findByPk(jwt_payload.id);
      if (utilisateur) {
        return done(null, utilisateur);
      }
      return done(null, false);
    } catch (error) {
      return done(error, false);
    }
  }));
};