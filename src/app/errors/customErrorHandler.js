const BaseError = require("./BaseError");

const customErrorHandler = (err, req, res, next) => {
  //console.error("Error occurred: ", err);
  if (err instanceof BaseError) {
    res.status(err.statusCode).json({
      status: err.statusCode,
      error_type: err.errorType,
      error_code: err.errorCode,
      message: err.message,
    });
  }
  next(err);
};

module.exports = customErrorHandler;
