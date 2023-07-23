const yup = require("yup");

const categorySchema = yup.object({
  name: yup.string().required().min(3).max(50),
  description: yup.string().trim().required().min(10).max(100),
});

module.exports = categorySchema;
