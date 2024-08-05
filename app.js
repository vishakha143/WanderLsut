if(process.env.NODE_ENV != 'production'){
      
     require('dotenv').config();

}

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const LocalStartegy = require("passport-local");
const User = require("./models/user.js");
//const passportLocalMongoose = require("passport-local-mongoose");




const listingsRouter = require("./routes/Listings.js");
const reviewsRouter = require("./routes/Reviews.js");
const usersRouter = require("./routes/users.js");

const URL = 'mongodb://127.0.0.1:27017/Wanderlust'
const dbUrl = process.env.ATLASDB_URL;

main()
.then((res)=>{console.log("connection successful")})
.catch(err => console.log(err));


async function main() {
  //await mongoose.connect(URL);
  await mongoose.connect(dbUrl);
}



app.set("view engine" , "ejs");
app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
app.use(methodOverride("_method"));
app.engine("ejs" , ejsMate);
app.set("views" , path.join(__dirname , "views"));
app.use(express.static(path.join(__dirname , "/public")));


const store = MongoStore.create({
  mongoUrl :dbUrl,
  crypto : {
    secret : process.env.SECRET
  },
  touchAfter : 24*3600,
});

store.on("error" , ()=>{
    console.log("ERROR in MONGO SESSION STORE" , error);
});

const sessionOption = {
    store,
    secret :process.env.SECRET,
    resave : false,
    saveUninitialized : true,
    cookie : {
      expires : Date.now() +7 * 24 *60 *60*60,
      maxAge : 7 * 24 *60 *60*60,
      httpOnly : true,
    },
}

// app.get("/" , (req,res)=>{
//   res.send("root working :)");
// });




app.use(session(sessionOption));
app.use(flash());


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStartegy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Middle-ware for flash
app.use((req , res , next)=>{
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

// app.get("/demouser" , async(req , res)=>{
//     let fakeUser = new User({
//          email : "student@gmail.com",
//          username : "delta - student",
//     });

//    let registerUser =  await User.register(fakeUser , "vishakha");
//    res.send(registerUser);
// });


       
       //Listings
app.use("/Listings",listingsRouter);

        //review
app.use("/Listings/:id/reviews",reviewsRouter);

        //user
app.use("/" , usersRouter);


// app.get("/testListing" , async(req,res)=>{
//       const sampleListing = new Listing({
//         title : "My New Apartment",
//         description : "Near by Mall",
//         price : 400 ,
//         location : "Patna , Bihar",
//         country : "India",
//       });
//      await sampleListing.save();
//      res.send("saved");
//      console.log("sample saved");
// });

app.all("*",(req ,res ,next)=>{
     next(new ExpressError(404 , "page not found"));
});


//Error Handling Middleware
app.use((err , req ,res, next) =>{
  let {statusCode = 500 , message="Something went wrong !!"} = err;
  // res.send("something went wrong !!");
  // res.status(statusCode).send(message);
  res.status(statusCode).render("listings/error.ejs",{message});
    
});

app.listen(3000 , ()=>{
   console.log("listening on port");
});