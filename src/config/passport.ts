import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import passportJWT from 'passport-jwt';
import { AccountRepository } from '../DA';
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(
  new LocalStrategy(function (username, password, done) {
    return AccountRepository.authenticate(username, password)
      .then((account) => {
        if (account == null)
          return done(null, false, {
            message: 'Username or password is wrong!',
          });

        return done(null, account);
      })
      .catch((err) => done(err));
  }),
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'authtoken',
    },
    function (jwtPayload, cb) {
      return AccountRepository.getById(jwtPayload._id)
        .then((account) => {
          return cb(null, account);
        })
        .catch((err) => cb(err));
    },
  ),
);
