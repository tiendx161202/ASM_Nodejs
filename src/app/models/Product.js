const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = new Schema({
    name:{type:String},
    img:{type:String},
    description:{type:String},
    price:{type:Number},
},{
    timestamps: true,
});

module.exports = mongoose.model('Product',Product);