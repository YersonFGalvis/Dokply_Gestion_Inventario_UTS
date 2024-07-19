"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpResponse = exports.HttpStatus = void 0;
var HttpStatus;
(function (HttpStatus) {
    HttpStatus[HttpStatus["OK"] = 200] = "OK";
    HttpStatus[HttpStatus["NOT_FOUND"] = 404] = "NOT_FOUND";
    HttpStatus[HttpStatus["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    HttpStatus[HttpStatus["FORBIDDEN"] = 403] = "FORBIDDEN";
    HttpStatus[HttpStatus["SERVER_ERROR"] = 500] = "SERVER_ERROR";
    HttpStatus[HttpStatus["BAD_REQUEST"] = 400] = "BAD_REQUEST";
})(HttpStatus = exports.HttpStatus || (exports.HttpStatus = {}));
class HttpResponse extends Error {
    OK(data) {
        return {
            status: HttpStatus.OK,
            statusMessage: "Success",
            data
        };
    }
    NotFound(data) {
        return {
            status: HttpStatus.NOT_FOUND,
            statusMessage: "Not found",
            error: data
        };
    }
    Unauthorized(data) {
        return {
            status: HttpStatus.UNAUTHORIZED,
            statusMessage: "Unauthorized",
            error: data
        };
    }
    Forbidden(data) {
        return {
            status: HttpStatus.FORBIDDEN,
            statusMessage: "Forbidden",
            error: data
        };
    }
    ServerError(data) {
        return {
            status: HttpStatus.SERVER_ERROR,
            statusMessage: "Internal server error",
            error: data
        };
    }
    BadRequest(data, name) {
        return {
            status: HttpStatus.BAD_REQUEST,
            statusMessage: "Bad request",
            error: data,
            ErrorName: name
        };
    }
}
exports.HttpResponse = HttpResponse;
//# sourceMappingURL=http.js.map