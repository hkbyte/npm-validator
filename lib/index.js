"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.T = void 0;
const string_1 = require("./types/string");
const object_1 = require("./types/object");
const number_1 = require("./types/number");
const boolean_1 = require("./types/boolean");
const array_1 = require("./types/array");
const any_1 = require("./types/any");
class T {
    static any() {
        return new any_1.TypeAny();
    }
    static string() {
        return new string_1.TypeString();
    }
    static number() {
        return new number_1.TypeNumber();
    }
    static boolean() {
        return new boolean_1.TypeBoolean();
    }
    static array(elementSchema) {
        return new array_1.TypeArray(elementSchema);
    }
    static object(schema) {
        return new object_1.TypeObject(schema);
    }
}
exports.T = T;
