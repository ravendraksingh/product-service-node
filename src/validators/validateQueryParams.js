const validateQueryParams =
  (categoryIdSchema, categoryNameSchema) => async (req, res, next) => {
    try {
      await categoryIdSchema.validate(req.query.id, { abortEarly: false });
      await categoryNameSchema.validate(req.query.name, {
        abortEarly: false,
        stripUnknown: true,
      });
      return next();
    } catch (err) {
      console.error("Error in validation: ", err.errors.join(", "));
      return res
        .status(422)
        .json({ error: { type: err.name, message: err.errors.join(", ") } });
    }
  };

module.exports = validateQueryParams;
