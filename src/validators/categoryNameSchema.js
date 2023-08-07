const yup = require("yup");

const categoryNameSchema = yup.string().when({
  is: (exists) => !!exists,
  then: (rule) => rule.test("name", "Invalid category name", (name) => name.length > 2),
});

module.exports = categoryNameSchema;
