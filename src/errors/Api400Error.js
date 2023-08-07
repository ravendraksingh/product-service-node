const BaseError = require("./baseError");
const errorTypes = require("./errorTypes");

class Api400Error extends BaseError {
  constructor(message) {
    super(400, errorTypes.invalid_request_error, "CL0PRD01", message);
    Object.setPrototypeOf(this, BaseError.prototype);
    this.name = "Api400Error";
  }
}

module.exports = Api400Error;
