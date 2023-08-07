class BaseError extends Error {
  constructor(statusCode, errorType, errorCode, message) {
    super(message);
    Object.setPrototypeOf(this, BaseError.prototype);
    Error.captureStackTrace(this, this.constructor);
    // this.name = this.constructor.name;
    this.name = "BaseError";
    this.statusCode = statusCode;
    this.errorType = errorType;
    this.errorCode = errorCode;
  }
}

module.exports = BaseError;
