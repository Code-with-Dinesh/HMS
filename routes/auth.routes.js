const router = require('express').Router()

const {register} = require("../controller/user.controller")

router.route("/register").post(register)

module.exports = router;

