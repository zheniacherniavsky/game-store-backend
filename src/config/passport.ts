import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import passportJWT from 'passport-jwt';
import { AccountRepository } from '../DA';
import { SECRET_AUTH } from './secretToken';
import { compareHashedData } from '../helpers/hash';
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(
  new LocalStrategy(function (username, password, done) {
    return AccountRepository.getByUsername(username)
      .then(async (account) => {
        if (!account || !(await compareHashedData(password, account.password)))
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
      secretOrKey: SECRET_AUTH,
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
