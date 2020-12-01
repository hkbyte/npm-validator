import _ from 'lodash'
import { TypeBase } from '../base'
import validator from 'validator'

type ParsedType = string | null | undefined

export type MobilePhoneLocaleType =
    | 'am-Am'
    | 'ar-AE'
    | 'ar-BH'
    | 'ar-DZ'
    | 'ar-EG'
    | 'ar-IQ'
    | 'ar-JO'
    | 'ar-KW'
    | 'ar-SA'
    | 'ar-SY'
    | 'ar-TN'
    | 'az-AZ'
    | 'bs-BA'
    | 'be-BY'
    | 'bg-BG'
    | 'bn-BD'
    | 'cs-CZ'
    | 'da-DK'
    | 'de-DE'
    | 'de-AT'
    | 'de-CH'
    | 'el-GR'
    | 'en-AU'
    | 'en-CA'
    | 'en-GB'
    | 'en-GG'
    | 'en-GH'
    | 'en-HK'
    | 'en-MO'
    | 'en-IE'
    | 'en-IN'
    | 'en-KE'
    | 'en-MT'
    | 'en-MU'
    | 'en-NG'
    | 'en-NZ'
    | 'en-PK'
    | 'en-PH'
    | 'en-RW'
    | 'en-SG'
    | 'en-SL'
    | 'en-UG'
    | 'en-US'
    | 'en-TZ'
    | 'en-ZA'
    | 'en-ZM'
    | 'en-ZW'
    | 'es-CL'
    | 'es-CO'
    | 'es-CR'
    | 'es-EC'
    | 'es-ES'
    | 'es-MX'
    | 'es-PA'
    | 'es-PY'
    | 'es-UY'
    | 'et-EE'
    | 'fa-IR'
    | 'fi-FI'
    | 'fj-FJ'
    | 'fo-FO'
    | 'fr-BE'
    | 'fr-FR'
    | 'fr-GF'
    | 'fr-GP'
    | 'fr-MQ'
    | 'fr-RE'
    | 'he-IL'
    | 'hu-HU'
    | 'id-ID'
    | 'it-IT'
    | 'ja-JP'
    | 'kk-KZ'
    | 'kl-GL'
    | 'ko-KR'
    | 'lt-LT'
    | 'ms-MY'
    | 'nb-NO'
    | 'ne-NP'
    | 'nl-BE'
    | 'nl-NL'
    | 'nn-NO'
    | 'pl-PL'
    | 'pt-BR'
    | 'pt-PT'
    | 'ro-RO'
    | 'ru-RU'
    | 'sl-SI'
    | 'sk-SK'
    | 'sr-RS'
    | 'sv-SE'
    | 'th-TH'
    | 'tr-TR'
    | 'uk-UA'
    | 'uz-UZ'
    | 'vi-VN'
    | 'zh-CN'
    | 'zh-HK'
    | 'zh-MO'
    | 'zh-TW'

export type PostalCodeLocaleType =
    | 'AD'
    | 'AT'
    | 'AU'
    | 'AZ'
    | 'BE'
    | 'BG'
    | 'BR'
    | 'CA'
    | 'CH'
    | 'CZ'
    | 'DE'
    | 'DK'
    | 'DZ'
    | 'EE'
    | 'ES'
    | 'FI'
    | 'FR'
    | 'GB'
    | 'GR'
    | 'HR'
    | 'HU'
    | 'ID'
    | 'IE'
    | 'IL'
    | 'IN'
    | 'IR'
    | 'IS'
    | 'IT'
    | 'JP'
    | 'KE'
    | 'LI'
    | 'LT'
    | 'LU'
    | 'LV'
    | 'MT'
    | 'MX'
    | 'NL'
    | 'NO'
    | 'NP'
    | 'NZ'
    | 'PL'
    | 'PR'
    | 'PT'
    | 'RO'
    | 'RU'
    | 'SA'
    | 'SE'
    | 'SI'
    | 'TN'
    | 'TW'
    | 'UA'
    | 'US'
    | 'ZA'
    | 'ZM'

type PreValidations = {
    nullable?: boolean
    trim?: 'all' | 'left' | 'right'
    optional?: boolean
    nonEmpty?: boolean
}

type Validations = {
    email?: boolean
    alpha?: boolean
    alphaNumeric?: boolean
    numeric?: boolean
    base64?: boolean
    creditCard?: boolean
    date?: boolean
    isoDate?: boolean
    hexColor?: boolean
    ipV4?: boolean
    ipV6?: boolean
    json?: boolean
    jsonAllowPrimitives?: boolean
    jwt?: boolean
    mimeType?: boolean
    mobilePhone?: boolean
    mobilePhoneLocales?: MobilePhoneLocaleType[]
    mongoObjectId?: boolean
    port?: boolean
    postalCode?: boolean
    postalCodeLocale?: PostalCodeLocaleType
    semVer?: boolean
    url?: boolean
    pattern?: RegExp
    patternName?: string
    min?: number
    max?: number
    length?: number
    case?: 'uppercase' | 'lowercase'
}

type PostValidations = {
    returnDefaultOnNull?: boolean
    returnDefaultOnEmpty?: boolean
    format?: 'capitalize' | 'uppercase' | 'lowercase'
    default?: ParsedType
}

export class TypeString extends TypeBase<NonNullable<ParsedType>> {
    private preValidations: PreValidations
    private validations: Validations
    private postValidations: PostValidations

    constructor() {
        super()

        this.preValidations = {}
        this.validations = {}
        this.postValidations = {}
    }

    trim(trimOption: PreValidations['trim'] = 'all') {
        this.preValidations.trim = trimOption
        return this
    }

    nullable(returnDefaultOnNull: boolean = false) {
        this.preValidations.nullable = true
        this.postValidations.returnDefaultOnNull = returnDefaultOnNull
        return this
    }

    nonEmpty(returnDefaultOnEmpty: boolean = false) {
        this.preValidations.nonEmpty = true
        this.postValidations.returnDefaultOnEmpty = returnDefaultOnEmpty
        return this
    }

    email() {
        this.validations.email = true
        return this
    }

    alpha() {
        this.validations.alpha = true
        return this
    }

    alphaNumeric() {
        this.validations.alphaNumeric = true
        return this
    }

    numeric() {
        this.validations.numeric = true
        return this
    }

    base64() {
        this.validations.base64 = true
        return this
    }

    creditCard() {
        this.validations.creditCard = true
        return this
    }

    date(iso: boolean = false) {
        this.validations.date = true
        if (iso) {
            this.validations.isoDate = true
        }
        return this
    }

    mobilePhone(...locales: MobilePhoneLocaleType[]) {
        this.validations.mobilePhone = true
        if (!_.isEmpty(locales)) {
            this.validations.mobilePhoneLocales = locales
        }
        return this
    }

    postalCode(locale?: PostalCodeLocaleType) {
        this.validations.postalCode = true
        if (!_.isEmpty(locale)) {
            this.validations.postalCodeLocale = locale
        }
        return this
    }

    hexColor() {
        this.validations.hexColor = true
        return this
    }

    ipV4() {
        this.validations.ipV4 = true
        return this
    }

    ipV6() {
        this.validations.ipV6 = true
        return this
    }

    json() {
        this.validations.json = true
        return this
    }

    jwt() {
        this.validations.jwt = true
        return this
    }

    mongoObjectId() {
        this.validations.mongoObjectId = true
        return this
    }

    mimeType() {
        this.validations.mimeType = true
        return this
    }

    port() {
        this.validations.port = true
        return this
    }

    semVer() {
        this.validations.semVer = true
        return this
    }

    url() {
        this.validations.url = true
        return this
    }
    pattern(pattern: RegExp, name?: string) {
        this.validations.pattern = pattern
        this.validations.patternName = name
        return this
    }

    min(minimumLength: number) {
        this.validations.min = minimumLength
        return this
    }

    max(maximumLength: number) {
        this.validations.max = maximumLength
        return this
    }

    length(length: number) {
        this.validations.length = length
        return this
    }

    case(values: Validations['case']) {
        this.validations.case = values
        return this
    }

    optional() {
        this.preValidations.optional = true
        return this
    }

    default(defaultValue: PostValidations['default']) {
        this.postValidations.default = defaultValue
        return this
    }

    format(formatOption: PostValidations['format']) {
        this.postValidations.format = formatOption
        return this
    }

    async parse(payload: unknown): Promise<ParsedType> {
        try {
            let value: ParsedType
            if (!_.isString(payload)) {
                if (_.isUndefined(payload)) {
                    if (this.preValidations.optional) {
                        return this.postValidations.default
                    }
                    throw new Error(`undefined not allowed`)
                } else if (_.isNull(payload)) {
                    if (this.preValidations.nullable) {
                        if (this.postValidations.returnDefaultOnNull) {
                            return this.postValidations.default
                        }
                        return null
                    }
                    throw new Error(`null value not allowed`)
                } else if (_.isNumber(payload)) {
                    value = payload.toString()
                } else {
                    throw new Error(`${typeof payload} type not allowed`)
                }
            } else {
                value = payload
            }

            if (this.preValidations.trim) {
                switch (this.preValidations.trim) {
                    case 'left':
                        value = value.trimLeft()
                        break
                    case 'right':
                        value = value.trimRight()
                        break
                    default:
                        value = value.trim()
                }
            }

            if (_.isEmpty(value)) {
                if (this.preValidations.nonEmpty) {
                    if (this.postValidations.returnDefaultOnEmpty) {
                        return this.postValidations.default
                    }
                    throw new Error('empty not allowed')
                }
            }

            if (this.validations.email) {
                if (!validator.isEmail(value)) {
                    throw new Error('invalid email format')
                }
            }
            if (this.validations.alpha) {
                if (!validator.isAlpha(value)) {
                    throw new Error('only alphabets allowed')
                }
            }
            if (this.validations.alphaNumeric) {
                if (!validator.isAlphanumeric(value)) {
                    throw new Error('only alpha numerics allowed')
                }
            }
            if (this.validations.numeric) {
                if (!validator.isNumeric(value)) {
                    throw new Error('only numerics allowed')
                }
            }
            if (this.validations.base64) {
                if (!validator.isBase64(value)) {
                    throw new Error('invalid base64')
                }
            }
            if (this.validations.creditCard) {
                if (!validator.isCreditCard(value)) {
                    throw new Error('invalid credit card number')
                }
            }
            if (this.validations.date) {
                if (this.validations.isoDate) {
                    if (!validator.isISO8601(value, { strict: false })) {
                        throw new Error('invalid ISO8601 date format')
                    }
                }
                //@ts-ignore
                else if (!validator.isDate(value)) {
                    throw new Error('invalid date')
                }
            }
            if (this.validations.mobilePhone) {
                if (
                    !validator.isMobilePhone(
                        value,
                        this.validations.mobilePhoneLocales as any,
                    ) ||
                    'any'
                ) {
                    throw new Error('invalid mobile phone format')
                }
            }
            if (this.validations.postalCode) {
                if (
                    !validator.isPostalCode(
                        value,
                        this.validations.postalCodeLocale as any,
                    ) ||
                    'any'
                ) {
                    throw new Error('invalid postal code format')
                }
            }
            if (this.validations.hexColor) {
                if (!validator.isHexColor(value)) {
                    throw new Error('invalid hex color format')
                }
            }
            if (this.validations.ipV4) {
                if (!validator.isIP(value, 4)) {
                    throw new Error('invalid IPV4')
                }
            }
            if (this.validations.ipV6) {
                if (!validator.isIP(value, 6)) {
                    throw new Error('invalid IPV6')
                }
            }
            if (this.validations.json) {
                if (!validator.isJSON(value)) {
                    throw new Error('invalid json format')
                }
            }
            if (this.validations.jwt) {
                if (!validator.isJWT(value)) {
                    throw new Error('invalid jwt')
                }
            }
            if (this.validations.mongoObjectId) {
                if (!validator.isMongoId(value)) {
                    throw new Error('invalid mongo Object ID')
                }
            }
            if (this.validations.mimeType) {
                if (!validator.isMimeType(value)) {
                    throw new Error('invalid mime type')
                }
            }
            if (this.validations.port) {
                if (!validator.isPort(value)) {
                    throw new Error('invalid port number')
                }
            }
            if (this.validations.semVer) {
                if (!validator.isSemVer(value)) {
                    throw new Error('invalid SemVer')
                }
            }
            if (this.validations.url) {
                if (!validator.isURL(value)) {
                    throw new Error('invalid URL')
                }
            }
            if (this.validations.pattern) {
                if (!validator.matches(value, this.validations.pattern)) {
                    throw new Error(
                        `invalid ${this.validations.patternName || ''} pattern`,
                    )
                }
            }

            if (this.validations.length) {
                if (value.length !== this.validations.length) {
                    throw new Error(
                        `only ${this.validations.length} characters allowed`,
                    )
                }
            } else {
                if (this.validations.min) {
                    if (value.length < this.validations.min) {
                        throw new Error(
                            `minimum ${this.validations.min} characters allowed`,
                        )
                    }
                }
                if (this.validations.max) {
                    if (value.length > this.validations.max) {
                        throw new Error(
                            `maximum ${this.validations.max} characters allowed`,
                        )
                    }
                }
            }

            if (this.validations.case) {
                if (this.validations.case === 'lowercase') {
                    if (value !== value.toLowerCase())
                        throw new Error(`only lowercase allowed`)
                }
                if (this.validations.case === 'uppercase') {
                    if (value !== value.toUpperCase())
                        throw new Error(`only uppercase allowed`)
                }
            }

            if (this.postValidations.format) {
                switch (this.postValidations.format) {
                    case 'capitalize':
                        value = _.capitalize(value)
                        break
                    case 'lowercase':
                        value = value.toLowerCase()
                        break
                    case 'uppercase':
                        value = value.toUpperCase()
                        break
                }
            }
            return value
        } catch (err) {
            throw err
        }
    }
}
