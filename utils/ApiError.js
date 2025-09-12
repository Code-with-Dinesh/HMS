class ApiError extends Error {
    constructor(statusCode, message = "Something went wrong", errors = []) {
        if (errors.name === "ZodError") {
            errors = errors.errors.map(e => e.message);
        }
        super(message); 
        this.statusCode = statusCode;
        this.message = message;
        this.errors = errors;
        this.data = null;

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

module.exports = ApiError;
