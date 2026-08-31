"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const logger_1 = require("../utils/logger");
const globalErrorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    logger_1.logger.error(`${statusCode} - ${message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    if (err.stack) {
        logger_1.logger.error(err.stack);
    }
    res.status(statusCode).json({
        status: 'error',
        message: process.env.NODE_ENV === 'production' ? 'Internal Server Error' : message,
        ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
    });
};
exports.globalErrorHandler = globalErrorHandler;
//# sourceMappingURL=errorHandler.js.map