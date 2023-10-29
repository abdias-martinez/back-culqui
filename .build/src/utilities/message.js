"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageUtil = void 0;
var STATUS_CODE;
(function (STATUS_CODE) {
    STATUS_CODE[STATUS_CODE["SUCCESS"] = 201] = "SUCCESS";
    STATUS_CODE[STATUS_CODE["SERVER_ERROR"] = 500] = "SERVER_ERROR";
    STATUS_CODE[STATUS_CODE["FOUND_ERROR"] = 404] = "FOUND_ERROR";
    STATUS_CODE[STATUS_CODE["BAD_REQUEST"] = 400] = "BAD_REQUEST";
})(STATUS_CODE || (STATUS_CODE = {}));
class Result {
    constructor(statusCode, ok, message, data) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.ok = ok;
    }
    bodyToString() {
        return {
            statusCode: this.statusCode,
            body: JSON.stringify({
                ok: this.ok,
                message: this.message,
                data: this.data,
            }),
        };
    }
}
class MessageUtil {
    static successfulResponse(message, data) {
        const result = new Result(STATUS_CODE.SUCCESS, true, message, data);
        return result.bodyToString();
    }
    ;
    static internalServerErrorResponse(message) {
        const result = new Result(STATUS_CODE.SERVER_ERROR, false, message);
        return result.bodyToString();
    }
    ;
    static notFoundErrorResponse(message) {
        const result = new Result(STATUS_CODE.FOUND_ERROR, false, message);
        return result.bodyToString();
    }
    ;
    static badRequestResponse(message, data) {
        const result = new Result(STATUS_CODE.BAD_REQUEST, false, message, data);
        return result.bodyToString();
    }
    ;
}
exports.MessageUtil = MessageUtil;
