var bodyParser = require('body-parser');
var User = require('../models/user');
var jwt = require('jsonwebtoken');
var config = require('../../config/config');
var superSecret = config.secret;


module.exports = function (app, express) {
    var apiRouter = express.Router();

    //create user and give a token
    apiRouter.post('/signup', function (req, res) {
        User.findOne({username: req.body.username}, function (err, user) {

            if (user) {
                res.json({message: 'User with this username already exist'})
            }
            else {
                var newUser = new User();
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
                    var validPassword = user.comparePassword(req.body.password);

                    if (!validPassword) {
                        res.json({
                            message: 'Authentication failed. Wrong password.'
                        });
                    }
                    else {
                        //create a token
                        var token = jwt.sign({
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
/*
    apiRouter.use(function (req, res, next) {
        console.log('Somebody just came to our app!');
        var token = req.body.token || req.query.token || req.headers['x-access-token'];

        if (token) {
            jwt.verify(token, superSecret, function (err, decoded) {
                if (err) {
                    res.status(403).send({
                        message: 'failed to authenticate token.'
                    });
                } else {
                    req.decode = decoded;
                    next();
                }
            })
        } else {
            res.status(403).send({
                message: 'No token provided'
            })
        }

    });




    apiRouter.get('/me', function (req, res) {
        res.send(req.decoded);
    });
*/

    return apiRouter;

};