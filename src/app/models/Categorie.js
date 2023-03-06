const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Category = new Schema({
    categori_name:{type:String},
},{
    timestamps: true,
});

module.exports = mongoose.model('Category',Category);