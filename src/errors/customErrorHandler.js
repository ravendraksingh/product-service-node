const Api404Error = require("./Api404Error");
const BaseError = require("./BaseError");

const customErrorHandler = (err, req, res, next) => {
  console.error("Error occurred: ", err.message);
//   console.log("###", err.constructor.name, BaseError.name);
  if (err.constructor.name === BaseError.name) {
    res.header("Content-Type", "application/json");
    res.type("json").status(err.statusCode).send({
      status: err.statusCode,
      error_type: err.errorType,
      error_code: err.errorCode,
      message: err.message,
    });
  } else {
    next(err);
  }
  //   res.json({
  //     status: err.statusCode,
  //     error_type: err.errorType,
  //     error_code: err.errorCode,
  //     message: err.message,
  //   });
};

module.exports = customErrorHandler;
