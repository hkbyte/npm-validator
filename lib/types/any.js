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
exports.TypeAny = void 0;
const lodash_1 = __importDefault(require("lodash"));
const base_1 = require("../base");
class TypeAny extends base_1.TypeBase {
    constructor() {
        super();
        this.preValidations = {};
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
    default(defaultValue) {
        this.postValidations.default = defaultValue;
        return this;
    }
    parse(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
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
                return payload;
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.TypeAny = TypeAny;
