
const Listing = require("../models/listing");



module.exports.index = async(req,res)=>{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs" , {allListings});
};

module.exports.createForm =  (req,res)=>{
    //console.log(req.user);
    res.render("listings/new.ejs");
};

module.exports.showListing = async(req,res)=>{

    let {id}= req.params;
    // console.log(id);
    const listing = await Listing.findById(id)
    .populate({
        path : "reviews",
        populate : {
        path : "author"},
    })
    .populate("owner");
    if(! listing){
        req.flash("error" , "Listing you a searching for doesn't exist");
        res.redirect("/Listings");
    }
    //console.log(listing);
    //console.log(listing.category);
    res.render("listings/show.ejs" , {listing});

   
};

module.exports.createListing = async(req,res,next)=>{

    let url = req.file.path;
    let filename = req.file.filename;
    let newlisting = new Listing(req.body.Listing);
    newlisting.owner = req.user._id; //to storing id of that particular user
    newlisting.image = {url , filename};

    let API_URL = 'https://api.jawg.io/places/v1/search';
    let city = req.body.Listing.location;
    let mapToken = process.env.MAP_TOKEN;
    
 
    let info = async()=>{
        let res = await fetch(`${API_URL}?&access-token=${mapToken}&text=${city}`);
        let response = await res.json();
        console.log(response.features[0].geometry);
     
    newlisting.geometry = response.features[0].geometry;
   
    //console.log(newlisting);
    let savelisting = await newlisting.save();
    console.log(savelisting);
    }
    info();

    req.flash("success", "List created successfully");
    res.redirect("/Listings");
   
 
};

module.exports.editListing = async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    // console.log(listing);
    if(! listing){
        req.flash("error" , "Listing you a searching for doesn't exist");
        res.redirect("/Listings");
    }
     let originalImageUrl = listing.image.url;
     originalImageUrl = originalImageUrl.replace("/upload","/upload/h_100/w_100");

    res.render("listings/edit.ejs" , {listing , originalImageUrl} );
} ; 

module.exports.updateListing = async(req,res)=>{
    let {id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id , {...req.body.Listing});
    //console.log(listing);
    if(typeof req.file !== "undefined"){
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = {url , filename};
    //listing.category = req.body.Listing;
   
    await listing.save();
    }
    console.log(listing);
    req.flash("success", "List Edited successfully");
    res.redirect(`/Listings/${id}`);
};

module.exports.destroyListing = async(req,res)=>{
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    req.flash("success", "Deletion successfully");
    res.redirect("/Listings");
   
    console.log(deletedListing);
};