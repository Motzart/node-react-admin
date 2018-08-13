const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../server/models/User");
const cnofig = require("../config");

// TODO move this to config file
const secret = "secret";

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = cnofig.jwt_secret;

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, next) => {
      User.findById(jwt_payload.id, function(err, user) {
        if (err) {
          return next(err);
        }
        if (user) {
          return next(null, user);
        } else {
          return next(null, false);
          // or you could create a new account
        }
      });
    })
  );
};
