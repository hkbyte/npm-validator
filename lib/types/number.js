"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeNumber = void 0;
const lodash_1 = __importDefault(require("lodash"));
const base_1 = require("../base");
class TypeNumber extends base_1.TypeBase {
    constructor() {
        super();
        this.preValidations = {};
        this.validations = {};
        this.postValidations = {};
    }
    nullable(returnDefaultOnNull = false) {
        this.preValidations.nullable = true;
        this.postValidations.returnDefaultOnNull = returnDefaultOnNull;
        return this;
    }
    optional() {
        this.preValidations.optional = true;
        return this;
    }
    min(value) {
        this.validations.min = value;
        return this;
    }
    max(value) {
        this.validations.max = value;
        return this;
    }
    range(min, max) {
        this.validations.range = { min, max };
        return this;
    }
    int() {
        this.validations.int = true;
        return this;
    }
    positive() {
        this.validations.positive = true;
        return this;
    }
    nonPositive() {
        this.validations.nonPositive = true;
        return this;
    }
    negative() {
        this.validations.negative = true;
        return this;
    }
    nonNegative() {
        this.validations.nonNegative = true;
        return this;
    }
    default(defaultValue) {
        this.postValidations.default = defaultValue;
        return this;
    }
    parse(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let value;
                if (!lodash_1.default.isNumber(payload)) {
                    if (lodash_1.default.isUndefined(payload)) {
                        if (this.preValidations.optional) {
                            return this.postValidations.default;
                        }
                        throw new Error(`undefined not allowed`);
                    }
                    else if (lodash_1.default.isNull(payload)) {
                        if (this.preValidations.nullable) {
                            if (this.postValidations.returnDefaultOnNull) {
                                return this.postValidations.default;
                            }
                            return null;
                        }
                        throw new Error(`null value not allowed`);
                    }
                    else if (lodash_1.default.isString(payload)) {
                        value = +payload;
                        if (lodash_1.default.isNaN(value)) {
                            throw new Error(`${payload} not allowed`);
                        }
                    }
                    else {
                        throw new Error(`${typeof payload} type not allowed`);
                    }
                }
                else {
                    value = payload;
                }
                if (!lodash_1.default.isEmpty(value) && !lodash_1.default.isInteger(value)) {
                    if (!this.validations.int) {
                        throw new Error('only int values allowed');
                    }
                }
                if (value < 0) {
                    if (this.validations.positive) {
                        throw new Error('only positive values allowed');
                    }
                    if (this.validations.nonNegative) {
                        throw new Error('only non negative values allowed');
                    }
                }
                else if (value > 0) {
                    if (this.validations.negative) {
                        throw new Error('only negative values allowed');
                    }
                    if (this.validations.nonPositive) {
                        throw new Error('only non positive values allowed');
                    }
                }
                else {
                    if (this.validations.positive) {
                        throw new Error('only positive values allowed');
                    }
                    if (this.validations.negative) {
                        throw new Error('only negative values allowed');
                    }
                }
                if (this.validations.range) {
                    if (value < this.validations.range.min ||
                        value > this.validations.range.max) {
                        throw new Error(`range from ${this.validations.range.min} to ${this.validations.range.max} is allowed`);
                    }
                }
                else {
                    if (this.validations.min) {
                        if (value < this.validations.min) {
                            throw new Error(`minimum ${this.validations.min} is allowed`);
                        }
                    }
                    if (this.validations.max) {
                        if (value > this.validations.max) {
                            throw new Error(`maximum ${this.validations.max} is allowed`);
                        }
                    }
                }
                return value;
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.TypeNumber = TypeNumber;
