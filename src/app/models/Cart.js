const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Cart = new Schema(
  {
    products: [
      {
        product_id: { type: mongoose.Types.ObjectId , required: true},
        name: { type: String, required: true},
        quanity: { type: Number, required: true},
        unit_price: { type: Number, required: true},
        // total_price: { type: Number, required: true},
        img :{type: String, required: true}
      },
    ],

    user:{
        user_id: { type:mongoose.Types.ObjectId, required: true},
        username: { type: String, required: true},
        address:{ type: String, required: true},
        numberphone:{ type: String, required: true}
    },

    // total_price_cart:{type: Number, required: true},
    status_cart:{type: String, required: true},
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Cart", Cart);
