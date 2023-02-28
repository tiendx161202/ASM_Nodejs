const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = new Schema({
    product_name:{type:String},
    product_img:{type:String},
    category_id:{type:Number},
    product_price:{type:Number},
    product_stock:{type:Number},
    product_info:{type:String},
    product_content:{type:String},
    createdAt:{type:Date},
    updatedAt:{type:Date},
},{
    timestamps: true,
});

module.exports = mongoose.model('Product',Product);