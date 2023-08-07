const errorTypes = {
  duplicate_request_error: "Duplicate traceid received in the request",
  invalid_request_error: "The request format is not correct",
  authentication_error:
    "The authentication signature received in the request could not be matched",
  inaccessible_resource_error:
    "The resource is forbidden and can't be accessed",
  not_found_error: "not_found_error", // "The resource could not be found"
  invalid_method_error: "Method in the request is not supported",
  invalid_media_type_error: "Unspported media type in the request",
  invalid_data_error:
    "The request could not be processed due to incorrect/inconsistent parameter values",
  mandate_validation_error: "Mandate related validation error",
  api_validation_error:
    "The request could not be processed due to business logic violation",
  api_processing_error:
    "Some internal error occurred while processing the request",
  api_connection_error:
    "There is a problem in connecting to internal appplications",
};

module.exports = errorTypes;
