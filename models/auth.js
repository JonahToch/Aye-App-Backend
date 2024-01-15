var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AuthTokenSchema = new Schema(
    {
        access_token: {type: String},
        scope: {type: String},
        expires_in: {type: Number},
        token_type: {type: String},
        expires_at: {type: Date},
    }
);

// Virtual for Poops's URL
AuthTokenSchema
    .virtual('url')
    .get(function () {
        return '/api/v1/auth/';
    });

//Export model
module.exports = mongoose.model('Auth', AuthTokenSchema);