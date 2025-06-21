const express = require('express');

const router = express.Router();

const userController = require('../contoller/user');

router.post('/signup', userController.signUp);

router.post('/login',userController.login);
router.get('/premiumstatus',userController.checkStatus);

// router.get('/', (req, res) => {
    // res.sendFile('notfound.html',{root:'views'});
    // return res.status(404).json({ success: false, message: 'Route not found' });
// });

// router.get('',userController.usergethomePage);

module.exports = router;
