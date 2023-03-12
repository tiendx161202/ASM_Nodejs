const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);

const Category = new Schema({
    categoryname:{type:String , required:true},
    slug: { type: String, slug: "categoryname" , unique  :true },
},{
    timestamps: true,
});

module.exports = mongoose.model('Category',Category);