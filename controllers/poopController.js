var Poop = require('../models/poop');

exports.poop_list = function(req, res, next) {
    Poop.find({}, 'user description rating')
        .sort({user: 1})
        .populate('description')
        .exec(function (err, list_poops) {
            if (err) { return next(err); }
        // We have succeeded we can now render
        res.render('poop_list', { title: 'Poop List', poop_list: list_poops });
        })
};


function poopCreate(name, description, rating, date, fullAddr, longitude, latitude, street, city, longState, country, zipcode) {
    poopDetail = {name: name, description: description, rating: rating, date: date, fullAddr: fullAddr, longitude: longitude, latitude: latitude, street: street, city: city, longState: longState, country: country, zipcode: zipcode}

    var poop = new Poop(poopDetail);

    poop.save(function (err) {
        if (err) {
            console.log(err);
            return
        }
        console.log('You created a new poop:  ' + poop);
        return
    } );
}

// var query = Poop.find();
//
// query.select('name description rating');
//
// query.exec(function (err, poops) {
//     if (err) return handleError(err);
//     console.log(poops);
// })

exports.poop_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Poop detail: ' + req.params.id);
};

exports.poop_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Poop create GET');
};

exports.poop_all = function(req, res, next) {
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



exports.poop_add_rating = function(req, res) {
    Poop.findOne({ _id: "631017356a4447010cfb448c"}).
    then(doc => Poop.updateOne({_id: doc._id }, {likes: 20})).
    then((doc =>  res.json(doc)));

};




exports.poop_create_post = function(req, res) {
    var poop = new Poop();
    // poop.user = req.body.user;
    poop.name = req.body.name;
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
        name: poop.name,
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




exports.poop_create_update = function(req, res) {
    res.send('NOT IMPLEMENTED: Poop create update');
}

exports.poop_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Poop delete POST');
};