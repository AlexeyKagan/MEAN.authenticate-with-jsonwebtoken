const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const UserSchema = new Schema({
  name: String,
  username: {
    type: String,
    required: true,
    index: {unique: true}
  },
  password: {
    type: String,
    required: true,
    select: false
  }
});
//before save hash password
UserSchema.pre('save', function (next) {
  const user = this;
  if (!user.isModified('password')) return next();

  bcrypt.hash(user.password, null, null, function (err, hash) {
    if (err) return next(err);

    user.password = hash;
    next();

  })
});

//method for compare passwords
UserSchema.methods.comparePassword = function (password) {
  const user = this;

  return bcrypt.compareSync(password, user.password);
};

module.exports = mongoose.model('User', UserSchema);
