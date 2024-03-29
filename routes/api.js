var express = require('express');
var router = express.Router();


var user_controller = require('../controllers/usersController');
var poop_controller = require('../controllers/poopController');
var auth_controller = require('../controllers/authController');
var sesame_controller = require('../controllers/sesameController');
var webController = require('../controllers/systemController');


router.get('/', user_controller.index);

// router.post('/user/create', user_controller.user_create_post);

// router.post('/user/update', user_controller.user_create_update);

router.get('/users', user_controller.isUsernameUnique);
router.get('/users2', user_controller.getUserById);

router.patch('/users', user_controller.updateAyeUser);

// router.get('/user/:id', user_controller.user_detail);


router.get('/poop/list-all', poop_controller.poop_all);

router.post('/poop/create', poop_controller.poop_create_post);

router.post('/poop/add-rating', poop_controller.poop_add_rating);

router.post('/poop/add-comment', poop_controller.poop_add_comment);

router.post('/poop/add-comment-reply', poop_controller.poop_add_comment_reply);

router.post('/poop/add-comment-rating', poop_controller.poop_comment_add_rating);


//
// router.post('/poop/update', poop_controller.poop_create_update);
//
router.get('/poops', poop_controller.poop_list);

router.get('/poop/:id', poop_controller.poop_detail);

router.post('/system/web-server-restart', webController.web_backend_restart);

router.get('/auth', auth_controller.get_management_token);

// router.post('/auth', auth_controller.post_management_token);

router.post('/sesame', sesame_controller.postSesameRouter);

router.get('/sesame', sesame_controller.getSesame);


module.exports = router;