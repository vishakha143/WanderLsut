const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

//bydefault PLM stores username ,hashpassword , salt-value automatically
// either mentioning or not in schema's feild
const userSchema = new Schema({
    email : {
        type : String,
        required : true,
    },
    // role:{type:String,enum : ['student','Trecher']}
});

// to implement those above default without building it from strach
userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User" , userSchema);
