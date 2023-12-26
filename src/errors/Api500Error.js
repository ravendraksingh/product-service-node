const BaseError = require("./BaseError");
const errorTypes = require("./errorTypes");

class Api500Error extends BaseError {
  constructor(message) {
    super(422, errorTypes.api_validation_error, "GENCAT01", message);
    Object.setPrototypeOf(this, BaseError.prototype);
    this.name = "Api500Error";
  }
}

module.exports = Api500Error;
