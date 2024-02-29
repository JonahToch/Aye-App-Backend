var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var SesameAuthSchema = new Schema(
    {
        sesameId: {type: String, unique: true, required: true},
        userId: {type: String, required: false},
        group: {type: String, required: false},
        config: {type: String, required: false},
    }, {
        // Define compound index on firstName and lastName
        indexes: [
            {sesameId: 1, userId: 1},
            {unique: true}
        ]
    });

// // Virtual for Poops's URL
// SesameAuthSchema
//     .virtual('url')
//     .get(function () {
//         return '/api/v1/sesame/' + this._id;
//     });
//
// //Export model
module.exports = mongoose.model('sesame', SesameAuthSchema);