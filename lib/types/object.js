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
exports.TypeObject = void 0;
const lodash_1 = __importDefault(require("lodash"));
const base_1 = require("../base");
const errors_1 = require("../errors");
class TypeObject extends base_1.TypeBase {
    constructor(schema) {
        super();
        this.schema = schema;
        this.preValidations = {};
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
                let parsedObject = {};
                // let parsedObject: <typeof > = {}
                if (!lodash_1.default.isObject(payload)) {
                    if (lodash_1.default.isUndefined(payload)) {
                        if (this.preValidations.optional) {
                            return this.postValidations.default;
                        }
                        throw new Error('undefined value not allowed');
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
                for (const el of Object.entries(this.schema)) {
                    try {
                        const parsedFieldValue = yield el[1].parse(lodash_1.default.get(payload, el[0], undefined));
                        Object.assign(parsedObject, {
                            [el[0]]: parsedFieldValue,
                        });
                    }
                    catch (err) {
                        throw new errors_1.ParsingError(`${el[0]}: ${err.message}`, [
                            {
                                field: el[0],
                                message: err.message,
                            },
                        ]);
                    }
                }
                return parsedObject;
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.TypeObject = TypeObject;
