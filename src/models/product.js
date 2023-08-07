const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
  },
  sku: String,
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: String,
  price_info: {
    mrp: {
      type: mongoose.Schema.Types.Number,
      validate: {
        validator: (value) => {
          return value > 0;
        },
        message: "MRP must be greater than zero",
      },
    },
    discount: Number,
    retail: Number,
  },
});

const Product = mongoose.model("product", ProductSchema);

module.exports = Product;
