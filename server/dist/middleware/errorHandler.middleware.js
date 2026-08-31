"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const logger_1 = require("../lib/logger");
const errorHandler = (err, req, res, next) => {
    logger_1.logger.error(`${req.method} ${req.originalUrl} - ${err.message}`);
    if (process.env.NODE_ENV === 'production') {
        res.status(500).json({
            error: 'Une erreur interne est survenue. Notre équipe a été alertée.'
        });
    }
    else {
        res.status(500).json({
            error: err.message,
            stack: err.stack
        });
    }
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.middleware.js.map