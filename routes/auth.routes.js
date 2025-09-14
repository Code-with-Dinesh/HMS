const router = require('express').Router()

const {register,login,forgotpassword,resetpassword} = require("../controller/user.controller")

router.route("/register").post(register)
router.route("/login").post(login)
router.route("/forgot-password").post(forgotpassword)
router.route("/reset-password").post(resetpassword)

module.exports = router;

