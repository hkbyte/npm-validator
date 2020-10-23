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
exports.TypeArray = void 0;
const lodash_1 = __importDefault(require("lodash"));
const base_1 = require("../base");
class TypeArray extends base_1.TypeBase {
    constructor(schema) {
        super();
        this.schema = schema;
        this.preValidations = {};
        this.validations = {};
        this.postValidations = {};
    }
    nullable(returnDefaultOnNull = false) {
        this.preValidations.nullable = true;
        this.postValidations.returnDefaultOnNull = returnDefaultOnNull;
        return this;
    }
    nonEmpty(returnDefaultOnEmpty = false) {
        this.preValidations.nonEmpty = true;
        this.postValidations.returnDefaultOnEmpty = returnDefaultOnEmpty;
        return this;
    }
    optional() {
        this.preValidations.optional = true;
        return this;
    }
    default(defaultValue) {
        this.postValidations.default = defaultValue;
        return this;
    }
    parse(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let parsedArray = [];
                if (!lodash_1.default.isArray(payload)) {
                    if (lodash_1.default.isUndefined(payload)) {
                        if (this.preValidations.optional) {
                            return this.postValidations.default;
                        }
                        throw new Error('null value not allowed');
                    }
                    else if (lodash_1.default.isNull(payload)) {
                        if (this.preValidations.nullable) {
                            if (this.postValidations.returnDefaultOnNull) {
                                return this.postValidations.default;
                            }
                            return null;
                        }
                        throw new Error('null value not allowed');
                    }
                    else {
                        throw new Error(`${typeof payload} type not allowed`);
                    }
                }
                if (lodash_1.default.isEmpty(payload)) {
                    if (this.preValidations.nonEmpty) {
                        if (this.postValidations.returnDefaultOnEmpty) {
                            return this.postValidations.default;
                        }
                        throw new Error('empty not allowed');
                    }
                }
                if (this.validations.length) {
                    if (payload.length !== this.validations.length) {
                        throw new Error(`only ${this.validations.length} elements allowed`);
                    }
                }
                else {
                    if (this.validations.min) {
                        if (payload.length < this.validations.min) {
                            throw new Error(`minimum ${this.validations.min} elements allowed`);
                        }
                    }
                    if (this.validations.max) {
                        if (payload.length > this.validations.max) {
                            throw new Error(`maximum ${this.validations.max} elements allowed`);
                        }
                    }
                }
                for (const el of payload) {
                    try {
                        const parsedElementValue = yield this.schema.parse(el);
                        parsedArray.push(parsedElementValue);
                    }
                    catch (err) {
                        throw err;
                    }
                }
                return parsedArray;
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.TypeArray = TypeArray;
