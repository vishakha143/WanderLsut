const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");


const listingSchema = new Schema({
    title :{
        type : String,
        require : true,
    },
    description : {
        type : String,
    },
    image :{
        url : String,
        filename : String,
    },
    price :Number,
    location : {
        type : String,
    },
    country :{
        type : String,
    },
    reviews : [
        {
            type : Schema.Types.ObjectId,
            ref : "Review",
        },
    ],
    owner : {
        type : Schema.Types.ObjectId,
        ref : "User",
    },
    category : {
        type : String,
        enum : ['Mountains','Trending','Amazing pools','Amazing views','Farms','Beachfront','Treehouse','Historic','Arctic'],
        default:"Trending",
    },
    geometry : {
        type: {
          type: String, // Don't do `{ location: { type: String } }`
          enum: ['Point'], // 'location.type' must be 'Point'
          required: true
        },
        coordinates: {
          type: [Number],
          required: true
        },
      },

});

//Middleware function - to delete reviewsId from Listing
listingSchema.post("findOneAndDelete" , async(listing)=>{
    if(listing){
      await Review.deleteMany({_id: {$in : listing.reviews}});
    }
});

const Listing = mongoose.model("Listing" , listingSchema);
module.exports = Listing;