const mongoose = require("mongoose");
const Listing =  require("../models/listing.js");
const initData =  require("./data.js");


async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Wanderlust');
}

main()
.then((res)=>{console.log("connection successful")})
.catch(err => console.log(err));



const initDB = async ()=>{
   await Listing.deleteMany({});
   // for storing owner datas;
   initData.data = initData.data.map((obj)=>({...obj , owner : '66a494140bd0457f83e03bb9',}));
   await Listing.insertMany(initData.data);
   console.log("data was initialized");
};

initDB();