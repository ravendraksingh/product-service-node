const BaseError = require("./baseError");
const errorTypes = require("./errorTypes");

class Api404Error extends BaseError {
  constructor(message) {
    super(404, errorTypes.not_found_error, "NFE00CAT01", message);
        Object.setPrototypeOf(this, BaseError.prototype);
        this.name = "Api404Error";
  }
}

module.exports = Api404Error;
