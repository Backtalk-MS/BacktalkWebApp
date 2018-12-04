const Strategy = require("passport-jwt").Strategy,
  ExtractJWT = require("passport-jwt").ExtractJwt,
  User = require("mongoose").model("users"),
  secret = require("./keys").passportSecret,
  options = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretKeys: secret
  };

module.exports = passport => {
  passport.use(
    new Strategy(options, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            //User encoded in token is valid
            return done(null, user);
          } else {
            return done(null, false);
          }
        })
        .catch(err => console.log(`Passport error encountered: ${err}`));
    })
  );
};
