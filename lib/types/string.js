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
exports.TypeString = void 0;
const lodash_1 = __importDefault(require("lodash"));
const base_1 = require("../base");
const validator_1 = __importDefault(require("validator"));
class TypeString extends base_1.TypeBase {
    constructor() {
        super();
        this.preValidations = {};
        this.validations = {};
        this.postValidations = {};
    }
    trim(trimOption = 'all') {
        this.preValidations.trim = trimOption;
        return this;
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
    email() {
        this.validations.email = true;
        return this;
    }
    alpha() {
        this.validations.alpha = true;
        return this;
    }
    alphaNumeric() {
        this.validations.alphaNumeric = true;
        return this;
    }
    numeric() {
        this.validations.numeric = true;
        return this;
    }
    base64() {
        this.validations.base64 = true;
        return this;
    }
    creditCard() {
        this.validations.creditCard = true;
        return this;
    }
    date(iso = false) {
        this.validations.date = true;
        if (iso) {
            this.validations.isoDate = true;
        }
        return this;
    }
    mobilePhone(...locales) {
        this.validations.mobilePhone = true;
        if (!lodash_1.default.isEmpty(locales)) {
            this.validations.mobilePhoneLocales = locales;
        }
        return this;
    }
    postalCode(locale) {
        this.validations.postalCode = true;
        if (!lodash_1.default.isEmpty(locale)) {
            this.validations.postalCodeLocale = locale;
        }
        return this;
    }
    hexColor() {
        this.validations.hexColor = true;
        return this;
    }
    ipV4() {
        this.validations.ipV4 = true;
        return this;
    }
    ipV6() {
        this.validations.ipV6 = true;
        return this;
    }
    json() {
        this.validations.json = true;
        return this;
    }
    jwt() {
        this.validations.jwt = true;
        return this;
    }
    mongoObjectId() {
        this.validations.mongoObjectId = true;
        return this;
    }
    mimeType() {
        this.validations.mimeType = true;
        return this;
    }
    port() {
        this.validations.port = true;
        return this;
    }
    semVer() {
        this.validations.semVer = true;
        return this;
    }
    url() {
        this.validations.url = true;
        return this;
    }
    pattern(pattern, name) {
        this.validations.pattern = pattern;
        this.validations.patternName = name;
        return this;
    }
    min(minimumLength) {
        this.validations.min = minimumLength;
        return this;
    }
    max(maximumLength) {
        this.validations.max = maximumLength;
        return this;
    }
    length(length) {
        this.validations.length = length;
        return this;
    }
    case(values) {
        this.validations.case = values;
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
    format(formatOption) {
        this.postValidations.format = formatOption;
        return this;
    }
    parse(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let value;
                if (!lodash_1.default.isString(payload)) {
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
                    else if (lodash_1.default.isNumber(payload)) {
                        value = payload.toString();
                    }
                    else {
                        throw new Error(`${typeof payload} type not allowed`);
                    }
                }
                else {
                    value = payload;
                }
                if (this.preValidations.trim) {
                    switch (this.preValidations.trim) {
                        case 'left':
                            value = value.trimLeft();
                            break;
                        case 'right':
                            value = value.trimRight();
                            break;
                        default:
                            value = value.trim();
                    }
                }
                if (lodash_1.default.isEmpty(value)) {
                    if (this.preValidations.nonEmpty) {
                        if (this.postValidations.returnDefaultOnEmpty) {
                            return this.postValidations.default;
                        }
                        throw new Error('empty not allowed');
                    }
                }
                if (this.validations.email) {
                    if (!validator_1.default.isEmail(value)) {
                        throw new Error('invalid email format');
                    }
                }
                if (this.validations.alpha) {
                    if (!validator_1.default.isAlpha(value)) {
                        throw new Error('only alphabets allowed');
                    }
                }
                if (this.validations.alphaNumeric) {
                    if (!validator_1.default.isAlphanumeric(value)) {
                        throw new Error('only alpha numerics allowed');
                    }
                }
                if (this.validations.numeric) {
                    if (!validator_1.default.isNumeric(value)) {
                        throw new Error('only numerics allowed');
                    }
                }
                if (this.validations.base64) {
                    if (!validator_1.default.isBase64(value)) {
                        throw new Error('invalid base64');
                    }
                }
                if (this.validations.creditCard) {
                    if (!validator_1.default.isCreditCard(value)) {
                        throw new Error('invalid credit card number');
                    }
                }
                if (this.validations.date) {
                    if (this.validations.isoDate) {
                        if (!validator_1.default.isISO8601(value)) {
                            throw new Error('invalid ISO8601 date format');
                        }
                    }
                    //@ts-ignore
                    if (!validator_1.default.isDate(value)) {
                        throw new Error('invalid date');
                    }
                }
                if (this.validations.mobilePhone) {
                    if (!validator_1.default.isMobilePhone(value, this.validations.mobilePhoneLocales) ||
                        'any') {
                        throw new Error('invalid mobile phone format');
                    }
                }
                if (this.validations.postalCode) {
                    if (!validator_1.default.isPostalCode(value, this.validations.postalCodeLocale) ||
                        'any') {
                        throw new Error('invalid postal code format');
                    }
                }
                if (this.validations.hexColor) {
                    if (!validator_1.default.isHexColor(value)) {
                        throw new Error('invalid hex color format');
                    }
                }
                if (this.validations.ipV4) {
                    if (!validator_1.default.isIP(value, 4)) {
                        throw new Error('invalid IPV4');
                    }
                }
                if (this.validations.ipV6) {
                    if (!validator_1.default.isIP(value, 6)) {
                        throw new Error('invalid IPV6');
                    }
                }
                if (this.validations.json) {
                    if (!validator_1.default.isJSON(value)) {
                        throw new Error('invalid json format');
                    }
                }
                if (this.validations.jwt) {
                    if (!validator_1.default.isJWT(value)) {
                        throw new Error('invalid jwt');
                    }
                }
                if (this.validations.mongoObjectId) {
                    if (!validator_1.default.isMongoId(value)) {
                        throw new Error('invalid mongo Object ID');
                    }
                }
                if (this.validations.mimeType) {
                    if (!validator_1.default.isMimeType(value)) {
                        throw new Error('invalid mime type');
                    }
                }
                if (this.validations.port) {
                    if (!validator_1.default.isPort(value)) {
                        throw new Error('invalid port number');
                    }
                }
                if (this.validations.semVer) {
                    if (!validator_1.default.isSemVer(value)) {
                        throw new Error('invalid SemVer');
                    }
                }
                if (this.validations.url) {
                    if (!validator_1.default.isURL(value)) {
                        throw new Error('invalid URL');
                    }
                }
                if (this.validations.pattern) {
                    if (!validator_1.default.matches(value, this.validations.pattern)) {
                        throw new Error(`invalid ${this.validations.patternName || ''} pattern`);
                    }
                }
                if (this.validations.length) {
                    if (value.length !== this.validations.length) {
                        throw new Error(`only ${this.validations.length} characters allowed`);
                    }
                }
                else {
                    if (this.validations.min) {
                        if (value.length < this.validations.min) {
                            throw new Error(`minimum ${this.validations.min} characters allowed`);
                        }
                    }
                    if (this.validations.max) {
                        if (value.length > this.validations.max) {
                            throw new Error(`maximum ${this.validations.max} characters allowed`);
                        }
                    }
                }
                if (this.validations.case) {
                    if (this.validations.case === 'lowercase') {
                        if (value !== value.toLowerCase())
                            throw new Error(`only lowercase allowed`);
                    }
                    if (this.validations.case === 'uppercase') {
                        if (value !== value.toUpperCase())
                            throw new Error(`only uppercase allowed`);
                    }
                }
                if (this.postValidations.format) {
                    switch (this.postValidations.format) {
                        case 'capitalize':
                            value = lodash_1.default.capitalize(value);
                            break;
                        case 'lowercase':
                            value = value.toLowerCase();
                            break;
                        case 'uppercase':
                            value = value.toUpperCase();
                            break;
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
exports.TypeString = TypeString;
