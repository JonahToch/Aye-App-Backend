var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema(
  {
    name: {type: String, required: true, maxLength: 100},
    title: {type: String, required: true, maxLength: 100},
  }
);

UserSchema.virtual('url')
    .get(function () {
        return '/api/v1/user' + this._id;
    });


module.exports = mongoose.model('User', UserSchema);