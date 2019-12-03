const model = require("./models.js");
const bcrypt = require("bcrypt");
const { User } = model;

exports.register = async (req, res) => {
  const hashedpasswd = await bcrypt.hash(req.body.password, 10);
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      res.send({ err: "this user already exists!" });
    } else {
      const user = new User({
        email: req.body.email,
        password: hashedpasswd,
        college: "",
        type: req.body.type || "user"
      });

      user
        .save()
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message: err.message || "Some error occured while creating the user"
          });
        });
    }
  });
};

exports.login = (req, res) => {
  console.log(req.session);
  let tempUser;
  User.findOne({ email: req.body.email })
    .then(user => {
      tempUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(comp => {
      console.log(comp);
      if (comp) {
        res.send(tempUser);
      } else {
        res.send({ err: "Password is incorrect!" });
      }
    })
    .catch(() => res.send({ err: "Email does not exist!" }));
};

exports.findAll = (req, res) => {
  User.find()
    .then(users => {
      res.status(200).send(users);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Error occured while retirving all users"
      });
    });
};

exports.findOne = (req, res) => {
  User.findById(req.params.userId)
    .then(user => res.status(200).send(user))
    .catch(() =>
      res.status(500).send({
        message: "Error occured while retreiving user"
      })
    );
};

exports.update = (req, res) => {
  User.findByIdAndUpdate(
    req.params.userId,
    {
      email: req.body.email,
      college: req.body.college
    },
    { new: true }
  )
    .then(user => {
      if (!user) {
        res.status(404).send({
          message: "No user avialable"
        });
      }
      res.send(user);
    })
    .catch(() => {
      res.status(500).send({
        message: "Error updating user"
      });
    });
};

exports.delete = (req, res) => {
  User.findByIdAndRemove(req.params.userId)
    .then(user => {
      if (!user) {
        res.status(404).send({
          message: "user not found"
        });
      }
      res.send(user);
    })
    .catch(() => {
      res.status(404).send({
        message: "no user with that id"
      });
    });
};
