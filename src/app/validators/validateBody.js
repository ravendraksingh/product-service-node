const validateBody = (schema) => async (req, res, next) => {
  try {
    await schema.validate(req.body, { abortEarly: false });
    return next();
  } catch (err) {
    console.log(err.errors.join(", "));
    return res
      .status(500)
      .json({ error: { type: err.name, message: err.errors.join(", ") } });
  }
};

module.exports = validateBody;
