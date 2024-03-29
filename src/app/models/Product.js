const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const Product = new Schema(
  {
    product_name: { type: String, required: true },
    product_img: { type: String, required: true },
    // categoryname:{type:String ,required:true},
    category_id: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    product_price: { type: Number, required: true },
    product_stock: { type: Number, required: true },
    product_info: { type: String, required: true },
    product_content: { type: String, required: true },
    product_status: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", Product);
