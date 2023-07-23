const validatePathParams = (schema) => async (req, res, next) => {
  try {
    await schema.validate(req.query.id, { abortEarly: false });
    return next();
  } catch (err) {
    console.error("Error in validation: ", err.errors.join(", "));
    return res
      .status(422)
      .json({ error: { type: err.name, message: err.errors.join(", ") } });
  }
};

module.exports = validatePathParams;
