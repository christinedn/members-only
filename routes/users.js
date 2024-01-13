var express = require('express');
var router = express.Router();
const userController = require('../controller/userController')


router.get('/sign-up', userController.sign_up_get)
router.post('/sign-up', userController.sign_up_post)
router.get('/log-in', userController.log_in_get)
router.post("/log-in", userController.log_in_post)
router.get('/log-out', userController.log_out_get)
router.get('/profile', userController.profile_get)
router.get('/member-admin', userController.member_admin_get)
router.put('/member-secret-password', userController.member_secret_password_check)
router.put('/admin-secret-password', userController.admin_secret_password_check)

module.exports = router;