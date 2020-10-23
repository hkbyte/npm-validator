import _ from 'lodash'
import { TypeBase } from '../base'

type ParsedType = number | null | undefined

type PreValidations = {
    nullable?: boolean
    optional?: boolean
}

type Validations = {
    min?: number
    max?: number
    range?: {
        min: number
        max: number
    }
    int?: boolean
    positive?: boolean
    nonPositive?: boolean
    negative?: boolean
    nonNegative?: boolean
}

type PostValidations = {
    returnDefaultOnNull?: boolean
    default?: ParsedType
}

export class TypeNumber extends TypeBase<NonNullable<ParsedType>> {
    private preValidations: PreValidations
    private validations: Validations
    private postValidations: PostValidations

    constructor() {
        super()

        this.preValidations = {}
        this.validations = {}
        this.postValidations = {}
    }
    nullable(returnDefaultOnNull: boolean = false) {
        this.preValidations.nullable = true
        this.postValidations.returnDefaultOnNull = returnDefaultOnNull
        return this
    }

    optional() {
        this.preValidations.optional = true
        return this
    }

    min(value: number) {
        this.validations.min = value
        return this
    }

    max(value: number) {
        this.validations.max = value
        return this
    }

    range(min: number, max: number) {
        this.validations.range = { min, max }
        return this
    }

    int() {
        this.validations.int = true
        return this
    }

    positive() {
        this.validations.positive = true
        return this
    }

    nonPositive() {
        this.validations.nonPositive = true
        return this
    }

    negative() {
        this.validations.negative = true
        return this
    }

    nonNegative() {
        this.validations.nonNegative = true
        return this
    }

    default(defaultValue: PostValidations['default']) {
        this.postValidations.default = defaultValue
        return this
    }

    async parse(payload: unknown): Promise<ParsedType> {
        try {
            let value: ParsedType
            if (!_.isNumber(payload)) {
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
                } else if (_.isString(payload)) {
                    value = +payload
                    if (_.isNaN(value)) {
                        throw new Error(`${payload} not allowed`)
                    }
                } else {
                    throw new Error(`${typeof payload} type not allowed`)
                }
            } else {
                value = payload
            }

            if (!_.isEmpty(value) && !_.isInteger(value)) {
                if (!this.validations.int) {
                    throw new Error('only int values allowed')
                }
            }

            if (value < 0) {
                if (this.validations.positive) {
                    throw new Error('only positive values allowed')
                }
                if (this.validations.nonNegative) {
                    throw new Error('only non negative values allowed')
                }
            } else if (value > 0) {
                if (this.validations.negative) {
                    throw new Error('only negative values allowed')
                }
                if (this.validations.nonPositive) {
                    throw new Error('only non positive values allowed')
                }
            } else {
                if (this.validations.positive) {
                    throw new Error('only positive values allowed')
                }
                if (this.validations.negative) {
                    throw new Error('only negative values allowed')
                }
            }

            if (this.validations.range) {
                if (
                    value < this.validations.range.min ||
                    value > this.validations.range.max
                ) {
                    throw new Error(
                        `range from ${this.validations.range.min} to ${this.validations.range.max} is allowed`,
                    )
                }
            } else {
                if (this.validations.min) {
                    if (value < this.validations.min) {
                        throw new Error(
                            `minimum ${this.validations.min} is allowed`,
                        )
                    }
                }
                if (this.validations.max) {
                    if (value > this.validations.max) {
                        throw new Error(
                            `maximum ${this.validations.max} is allowed`,
                        )
                    }
                }
            }

            return value
        } catch (err) {
            throw err
        }
    }
}
