"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const custom_error_1 = require("../errors/custom-error");
const errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err); // ✅ Prevents sending multiple responses
    }
    //console.error(err);
    if (err instanceof custom_error_1.CustomError) {
        res.status(err.statusCode).json({ errors: err.serializeErrors() });
    }
    res.status(400).json({
        errors: [{ message: "something went wrong" }],
    });
};
exports.errorHandler = errorHandler;
