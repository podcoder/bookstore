import { Strategy as JwtStrategy, StrategyOptions} from "passport-jwt";
import { ExtractJwt } from "passport-jwt";

// load up the user model
import { User } from "../models/user";

// get the DB config file
import {config } from "./database";



export const Passport = function (passport: any) {
  /**
   * The following line of code is the concise verison of:
   * interface Option { [key:string]: any}
   * let options: Option = {}
   */
  let options: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    secretOrKey: config.secret
  };


  passport.use(new JwtStrategy(options, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.id}, function(err:any, user:any) {
          if (err) {
              return done(err, false);
          }
          if (user) {
              done(null, user);
          } else {
              done(null, false);
          }
      });
  }));
}

// module.exports = function (passport) {
//   var opts = {};
//   opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
//   opts.secretOrKey = config.secret;
//   passport.use(
//     new JwtStrategy(opts, function (jwt_payload, done) {
//       User.findOne({ id: jwt_payload.id }, function (err, user) {
//         if (err) {
//           return done(err, false);
//         }
//         if (user) {
//           done(null, user);
//         } else {
//           done(null, false);
//         }
//       });
//     })
//   );
// };
