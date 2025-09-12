const { ZodError } = require('zod');
const asyncWrapper = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch((err) => {
            console.error("AsyncWrapper Error:", err);
            let statusCode = err.statusCode || 500;
            let message = err.message || "Internal Server Error";
            let errors = [];

            if (err instanceof ZodError) {
                statusCode = 400;
                message = "Validation failed";
                errors = err.errors.map(e => e.message);
            } else if (err.errors) {
                errors = Array.isArray(err.errors) ? err.errors : [err.errors];
            }

            res.status(statusCode).json({
                statusCode,
                message,
                errors,
                data: null
            });
        });
    };
};

module.exports = asyncWrapper;
