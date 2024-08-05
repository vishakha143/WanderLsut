const User = require("../models/user.js");

module.exports.renderSignupForm = (req,res)=>{
    res.render("users/signup.ejs");
}; 


module.exports.signup = async (req,res)=>{
    try{
   let {username , email , password} = req.body;
   const newUser = new User({email , username});
   const registerUser = await User.register(newUser , password);
   console.log(registerUser);
   req.login(registerUser , (err)=>{
    if(err){
        return next (err);
    }
    req.flash("success" , "Welcome to Wanderlust");
    res.redirect("/Listings");
   })
   
    }catch(er){
        //console.log(er);
        req.flash("error" , er.message);
        res.redirect("/signup");
    }
};

module.exports.renderLoginForm = (req ,res)=>{
    res.render("users/login.ejs");
    //console.log("got login form");
};

module.exports.login = async(req,res)=>{
    //console.log("login form submitted");
    req.flash("success" , "Welcome back to Wanderlust :) !");
    let redirectUrl = res.locals.redirectUrl || '/Listings';
    res.redirect(redirectUrl);
//res.send("success");
};

module.exports.logout = (req ,res)=>{
    req.logout((err)=>{
        if(err){
            return next (err);
        }
        req.flash("success" , "you are Logged out");
        res.redirect("/Listings");
    });
};