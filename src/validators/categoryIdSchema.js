const { isValidObjectId } = require("mongoose");
const yup = require("yup");

const categoryIdSchema = yup.string().when({
  is: (exists) => !!exists,
  then: (rule) => rule.test("id", "Invalid ObjectId", (id) => isValidObjectId(id)),
});

module.exports = categoryIdSchema;
