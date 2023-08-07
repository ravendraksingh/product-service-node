const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema(
  {
    catid: {
      type: mongoose.Schema.Types.Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

// CategorySchema.virtual("id").get(function () {
//   return this.catid;
// });
// CategorySchema.set("toJSON", { virtuals: true });

const Category = mongoose.model("category", CategorySchema);

module.exports = Category;
