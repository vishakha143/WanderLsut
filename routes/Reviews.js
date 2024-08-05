const express = require("express");
const router = express.Router({mergeParams : true});
const WrapAsync = require("../utili/AsyncWrap.js");
const {validateReview , isLoggedIn , isReviewAuthor} = require("../middleware.js");
const reviewController = require("../controllers/review.js");
 
          //Reviews
//Post Reviews Route
router.post("/" ,
    isLoggedIn,
     validateReview ,
       WrapAsync(reviewController.postReview));
 
 //delete Reviews Route
router.delete(
   "/:reviewId" ,
   isLoggedIn,
   isReviewAuthor,
    WrapAsync(reviewController.destroyReview))

module.exports = router;
 
        