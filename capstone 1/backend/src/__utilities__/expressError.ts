/** ExpressError extends normal JS error so we can
 *  add a status when we make an instance of it.
 *
 *  The error-handling middleware will return this.
 */
class ExpressError extends Error {
  message: string;
  status: number;
  data?: object;

  constructor(message: string, status: number) {
    super(message);
    this.message = message;
    this.status = status;
  }
}

/** 400 JSON VALIDATION error. */
class JsonValidationError extends ExpressError {
  data: object;

  constructor(message: string = "Not Found", data: object) {
    super(message, 400);
    this.data = data
  }
}

/** 404 NOT FOUND error. */
class NotFoundError extends ExpressError {
  constructor(message: string = "Not Found") {
    super(message, 404);
  }
}

/** 401 UNAUTHORIZED error. */
class UnauthorizedError extends ExpressError {
  constructor(message: string = "Unauthorized") {
    super(message, 401);
  }
}

/** 400 BAD REQUEST error. */
class BadRequestError extends ExpressError {
  constructor(message: string = "Bad Request") {
    super(message, 400);
  }
}

/** 403 FORBIDDEN error. */
class ForbiddenError extends ExpressError {
  constructor(message: string = "Forbidden") { // Corrected the default message
    super(message, 403);
  }
}

/** 405 NOTALLOWED error. */
class NotAllowedError extends ExpressError {
  constructor(message: string = "Method Not Allowed") { // Corrected the default message
    super(message, 405);
  }
}

export {
  ExpressError,
  NotFoundError,
  UnauthorizedError,
  BadRequestError,
  ForbiddenError,
  JsonValidationError
};