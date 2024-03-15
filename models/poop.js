var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PoopSchema = new Schema(
    {
        userId: {type: String, required: true},
        user: {type: Schema.Types.ObjectId, ref: 'User', required: false},
        name: {type: String, required: false},
        description: {type: String, required: true},
        rating: {type: String, required: true},
        date: {type: Date, required: false},
        fullAddr: {type: String, required: false},
        longitude: {type: String, required: false},
        latitude: {type: String, required: false},
        street: {type: String, required: false},
        city: {type: String, required: false},
        longState: {type: String, required: false},
        country: {type: String, required: false},
        zipcode: {type: String, required: false},
        likes: {type: Number, required: false, default: 0},
        dislikes: {type: Number, required: false, default: 0},
        comments: [
                {
                        userId: String,
                        user: String,
                        text: String,
                        date: Date,
                        likes: {type: Number, default: 0},
                        dislikes: {type: Number, default: 0},
                        replies: [{
                                userId: String,
                                user: String,
                                text: String,
                                date: Date,
                                likes: { type: Number, default: 0},
                                dislikes: { type: Number, default: 0}
                        }]
                }
        ]
    }
);

// Virtual for Poops's URL
PoopSchema
    .virtual('url')
    .get(function () {
        return '/api/v1/poop/' + this._id;
    });

//Export model
module.exports = mongoose.model('Poop', PoopSchema);