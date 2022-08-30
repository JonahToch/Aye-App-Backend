var express = require('express');
var router = express.Router();


var user_controller = require('../controllers/usersController');
var poop_controller = require('../controllers/poopController');

router.get('/', user_controller.index);

// router.post('/user/create', user_controller.user_create_post);

// router.post('/user/update', user_controller.user_create_update);

router.get('/users', user_controller.user_list);

router.get('/user/:id', user_controller.user_detail);


router.get('/poop/list-all', poop_controller.poop_all);

router.post('/poop/create', poop_controller.poop_create_post);


//
// router.post('/poop/update', poop_controller.poop_create_update);
//
router.get('/poops', poop_controller.poop_list);

router.get('/poop/:id', poop_controller.poop_detail);

module.exports = router;