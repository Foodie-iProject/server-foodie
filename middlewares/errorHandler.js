const errorHandler = (err, req, res, next) => {
    console.log(err)
    let code = 500;
    let message = "Internal Server Error";
    if (
      err.name === "SequelizeValidationError" ||
      err.name === "SequelizeUniqueConstraintError"
    ) {
      code = 400;
      message = err.errors[0].message;
    } else if (err.name === "bad_request") {
      code = 400;
      message = err.message;
    } else if (err.name === "unauthorized") {
      code = 401;
      message = "Invalid email or Password";
    } else if (err.name === "Not_Found") {
      code = 404;
      message = "Data not found";
    } else if (
      err.name === "invalid_token" ||
      err.name === "JsonWebTokenError" ||
      err.name === "invalid_role"
    ) {
      code = 401;
      message = "You have no access";
    } else if (err.name === "forbidden") {
      code = 403;
      message = "Forbidden";
    }
    res.status(code).json({ message });
  };
  
  module.exports = errorHandler;
  