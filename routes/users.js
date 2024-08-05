const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const WrapAsync = require("../utili/AsyncWrap.js");
const passport = require("passport");
const { savedRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/user.js");

         //signup
router
    .route("/signup")
    .get((userController.renderSignupForm))
    .post( WrapAsync (userController.signup ));

         //login
router
    .route("/login")
    .get((userController.renderLoginForm ))
    .post(savedRedirectUrl, 
        passport.authenticate('local',
          { failureRedirect: '/login', 
            failureFlash : true,
          }),
        (userController.login)
    );

router.get("/logout" , (userController.logout)
);

module.exports = router;