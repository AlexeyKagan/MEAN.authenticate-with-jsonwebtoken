const bodyParser = require('body-parser');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const superSecret = config.secret;


module.exports = function (app, express) {
  const apiRouter = express.Router();
  //create user and give a token
  apiRouter.post('/signup', function (req, res) {
    User.findOne({username: req.body.username}, function (err, user) {

      if (user) {
        res.json({message: 'User with this username already exist'})
      }
      else {
        const newUser = new User();
        newUser.name = req.body.name;
        newUser.username = req.body.username;
        newUser.password = req.body.password;
        newUser.save();

        res.json({
          message: 'User success create',
          token: jwt.sign({
            name: req.body.name,
            username: req.body.username
          }, superSecret)

        });
      }
    });
  });
  //if loggedin give a token
  apiRouter.post('/login', function (req, res) {
    User.findOne({username: req.body.username})
      .select('name username password')
      .exec(function (err, user) {
        if (!user) {
          res.json({
            message: 'Authentication failed. User not found.'
          })
        }

        else if (user) {
          const validPassword = user.comparePassword(req.body.password);

          if (!validPassword) {
            res.json({
              message: 'Authentication failed. Wrong password.'
            });
          }
          else {
            //create a token
            const token = jwt.sign({
              name: user.name,
              username: user.username
            }, superSecret);


            res.json({
              success: true,
              message: 'Enjoy your token',
              token: token
            })

          }

        }

      });

  });

  return apiRouter;
};