class BaseError extends Error {
  constructor(statusCode, errorType, errorCode, message) {
    super(message);

    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.errorType = errorType;
    this.errorCode = errorCode;
  }
}

module.exports = BaseError;
