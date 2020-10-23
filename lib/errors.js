"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParsingError = void 0;
class ParsingError extends Error {
    constructor(message, path) {
        super(message);
        this.path = path;
    }
}
exports.ParsingError = ParsingError;
