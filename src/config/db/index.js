const mongoose = require('mongoose');


 
async function connect(){

    try{
        mongoose.set('strictQuery' ,false);
        await mongoose.connect('mongodb://127.0.0.1:27017/sem3_asm_nodejs');
        console.log("MongoDB Connect");
    }catch(error){
        console.log("Connect failed");
    }
}

module.exports = {connect};