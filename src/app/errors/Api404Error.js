const BaseError = require("./BaseError");
const errorTypes = require("./errorTypes");

class Api404Error extends BaseError {
  constructor(message) {
    super(404, errorTypes.not_found_error, "NFE", message);
  }
}

module.exports = Api404Error;
