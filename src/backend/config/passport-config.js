const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const model = require("../users/models.js");
const { User } = model;

function initialize(passport) {
  console.log("initialize!!");
  const authenticateUser = async (email, password, done) => {
    console.log("authentiacting!");
    let tempUser = {};
    try {
      User.findOne({ email: email })
        .then(user => {
          tempUser = user;
          bcrypt.compare(passport, user.password);
        })
        .then(() => done(null, tempUser))
        .catch(err => {
          console.log(err);
          return done(err, false, { message: "No, user with that email" });
        });
    } catch (e) {
      return done(e);
    }
  };
  passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));
  passport.serializeUser((user, done) => done(null, user._id));
  passport.deserializeUser((id, done) => done(null, User.findById(id)));
}

module.exports = initialize;
