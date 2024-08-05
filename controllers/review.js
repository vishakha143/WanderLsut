const Review = require("../models/review");
const Listing = require("../models/listing.js");

module.exports.postReview = async(req , res)=>{
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);
    console.log(newReview);
    await newReview.save();
    await listing.save();
 
    console.log("New review saved");
    req.flash("success", "review added successfully");
    res.redirect(`/Listings/${listing._id}`);
 
 };

module.exports.destroyReview = async(req,res)=>{
    let {id , reviewId } = req.params;

    await Listing.findByIdAndUpdate(id , { $pull : {reviews : reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "review deleted successfully");
    res.redirect(`/Listings/${id}`);

};