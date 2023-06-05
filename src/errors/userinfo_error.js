"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserinfoError = void 0;
class UserinfoError extends Error {
    constructor(message, code) {
        super(message);
        this.name = "UserinfoError";
        this.code = code;
        this.message = message;
        Object.setPrototypeOf(this, UserinfoError.prototype);
    }
    getErrorMessage() {
        return 'Something went wrong: ' + this.message;
    }
}
exports.UserinfoError = UserinfoError;
