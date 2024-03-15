var Poop = require('../models/poop');

exports.poop_list = function (req, res, next) {
    Poop.find({}, 'user description rating')
        .sort({user: 1})
        .populate('description')
        .exec(function (err, list_poops) {
            if (err) {
                return next(err);
            }
            // We have succeeded we can now render
            res.render('poop_list', {title: 'Poop List', poop_list: list_poops});
        })
};


function poopCreate(userId, name, description, rating, date, fullAddr, longitude, latitude, street, city, longState, country, zipcode) {
    poopDetail = {
        userId: userId,
        description: description,
        rating: rating,
        date: date,
        fullAddr: fullAddr,
        longitude: longitude,
        latitude: latitude,
        street: street,
        city: city,
        longState: longState,
        country: country,
        zipcode: zipcode
    }

    var poop = new Poop(poopDetail);

    poop.save(function (err) {
        if (err) {
            console.log(err);
            return
        }
        console.log('You created a new poop:  ' + poop);
        return
    });
}

// var query = Poop.find();
//
// query.select('name description rating');
//
// query.exec(function (err, poops) {
//     if (err) return handleError(err);
//     console.log(poops);
// })

exports.poop_detail = function (req, res) {
    res.send('NOT IMPLEMENTED: Poop detail: ' + req.params.id);
};

exports.poop_create_get = function (req, res) {
    res.send('NOT IMPLEMENTED: Poop create GET');
};

exports.poop_all = function (req, res, next) {
    Poop.find().then(
        (things) => {
            res.status(200).json(things);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};


exports.poop_add_rating = function (req, res) {

    // console.log(req.body);

    Poop.findOne({_id: req.body._id}).then(doc => Poop.updateOne({_id: doc._id}, {likes: (doc.likes + req.body.likes)}))

    Poop.findOne({_id: req.body._id}).then(doc => Poop.updateOne({_id: doc._id}, {dislikes: (doc.dislikes + req.body.dislikes)})).then((doc => res.json(doc)));

};

exports.poop_add_comment = function (req, res) {

    console.log(req.body);

    Poop.findOneAndUpdate(
        {_id: req.body._id},
        {
            $push: {
                comments: {
                    "userId": req.body.userId,
                    "user": req.body.user,
                    "text": req.body.text,
                    "date": req.body.date
                }
            }
        }
    ).then((doc => res.json(doc)));

};

exports.poop_add_comment_reply = function (req, res) {

    const query = {_id: req.body.poop_id};
    const updateDocument = {
        $push: {
            "comments.$[item].replies": {
                "userId": req.body.userId,
                "user": req.body.user,
                "text": req.body.text,
                "date": req.body.date
            }
        },
    };
    const options = {
        arrayFilters: [
            {
                "item._id": req.body.comment_id,
            },
        ],
    };


    Poop.updateMany(query, updateDocument, options).then((doc => res.json(doc)));
};


exports.poop_comment_add_rating = function (req, res) {

    console.log(req.body);
    Poop.update({'comments._id': req.body._id}, {
        '$inc': {
            'comments.$.likes': req.body.likes,
            'comments.$.dislikes': req.body.dislikes
        }
    }).then((doc => res.json(doc)));

};

function handleError(error) {
    console.error('An error occurred:', error);
    // Additional error handling logic can be added here
}

exports.poop_create_post = function (req, res) {
    var poop = new Poop();
    poop.userId = req.body.userId;
    poop.description = req.body.description;
    poop.rating = req.body.rating;
    poop.date = req.body.date;
    poop.fullAddr = req.body.fullAddr;
    poop.longitude = req.body.longitude;
    poop.latitude = req.body.latitude;
    poop.street = req.body.street;
    poop.city = req.body.city;
    poop.longState = req.body.longState;
    poop.country = req.body.country;
    poop.zipcode = req.body.zipcode;

    poop.save(function (err) {
        if (err) return handleError(err);
    });

    res.json({
        userId: poop.userId,
        description: poop.description,
        rating: poop.rating,
        date: poop.date,
        fullAddr: poop.fullAddr,
        longitude: poop.longitude,
        latitude: poop.latitude,
        street: poop.street,
        city: poop.city,
        longState: poop.longState,
        country: poop.country,
        zipcode: poop.zipcode,
        likes: poop.likes,
        dislikes: poop.dislikes
    });
};


exports.poop_create_update = function (req, res) {
    res.send('NOT IMPLEMENTED: Poop create update');
}

exports.poop_delete_post = function (req, res) {
    res.send('NOT IMPLEMENTED: Poop delete POST');
};