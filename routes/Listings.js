const express = require("express");
const router = express.Router();
const WrapAsync = require("../utili/AsyncWrap.js");
const {isLoggedIn , isOwner ,validateListing} = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});

router
.route("/" )
.get(WrapAsync(listingController.index))   //Index Route
.post(
    isLoggedIn,
    upload.single('Listing[image]'),
    validateListing ,
    WrapAsync(listingController.createListing));   //Create Route

   
     //New Route
router.get("/new",isLoggedIn, (listingController.createForm));


router
    .route( "/:id")
    .get(
          WrapAsync(listingController.showListing))  //Show Route
    .put(
        isLoggedIn,
        isOwner ,
        upload.single('Listing[image]'),
        validateListing,
          WrapAsync(listingController.updateListing))  //Update Route
    .delete(
        isLoggedIn,
        isOwner ,
        WrapAsync(listingController.destroyListing));  //Delete Route
    
       
          //Edit Route
router.get(
    "/:id/edit",
    isLoggedIn, 
    isOwner ,
    WrapAsync(listingController.editListing));


module.exports = router;