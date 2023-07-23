const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema(
  {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
    },
    name: String,
    description: String,
  },
  {
    versionKey: false,
  }
);

const Category = mongoose.model("category", CategorySchema);

module.exports = Category;
