import _ from 'lodash'
import { TypeBase } from '../base'

type ParsedType = Array<unknown> | null | undefined

type PreValidations = {
    nullable?: boolean
    optional?: boolean
    nonEmpty?: boolean
}

type Validations = {
    min?: number
    max?: number
    length?: number
}

type PostValidations = {
    returnDefaultOnEmpty?: boolean
    returnDefaultOnNull?: boolean
    default?: ParsedType
}

export class TypeArray extends TypeBase<NonNullable<ParsedType>> {
    private preValidations: PreValidations
    private validations: Validations
    private postValidations: PostValidations
    private schema: TypeBase<unknown>

    constructor(schema: TypeBase<unknown>) {
        super()

        this.schema = schema
        this.preValidations = {}
        this.validations = {}
        this.postValidations = {}
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

    optional() {
        this.preValidations.optional = true
        return this
    }

    default(defaultValue: PostValidations['default']) {
        this.postValidations.default = defaultValue
        return this
    }

    async parse(payload: unknown[]): Promise<ParsedType> {
        try {
            let parsedArray: ParsedType = []
            if (!_.isArray(payload)) {
                if (_.isUndefined(payload)) {
                    if (this.preValidations.optional) {
                        return this.postValidations.default
                    }
                    throw new Error('null value not allowed')
                } else if (_.isNull(payload)) {
                    if (this.preValidations.nullable) {
                        if (this.postValidations.returnDefaultOnNull) {
                            return this.postValidations.default
                        }
                        return null
                    }
                    throw new Error('null value not allowed')
                } else {
                    throw new Error(`${typeof payload} type not allowed`)
                }
            }

            if (_.isEmpty(payload)) {
                if (this.preValidations.nonEmpty) {
                    if (this.postValidations.returnDefaultOnEmpty) {
                        return this.postValidations.default
                    }
                    throw new Error('empty not allowed')
                }
            }

            if (this.validations.length) {
                if (payload.length !== this.validations.length) {
                    throw new Error(
                        `only ${this.validations.length} elements allowed`,
                    )
                }
            } else {
                if (this.validations.min) {
                    if (payload.length < this.validations.min) {
                        throw new Error(
                            `minimum ${this.validations.min} elements allowed`,
                        )
                    }
                }
                if (this.validations.max) {
                    if (payload.length > this.validations.max) {
                        throw new Error(
                            `maximum ${this.validations.max} elements allowed`,
                        )
                    }
                }
            }

            for (const el of payload) {
                try {
                    const parsedElementValue = await this.schema.parse(el)
                    parsedArray.push(parsedElementValue)
                } catch (err) {
                    throw err
                }
            }

            return parsedArray
        } catch (err) {
            throw err
        }
    }
}
