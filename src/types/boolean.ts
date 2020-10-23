import _ from 'lodash'
import { TypeBase } from '../base'

type ParsedType = boolean | null | undefined

type PreValidations = {
    nullable?: boolean
    optional?: boolean
}

type Validations = {}

type PostValidations = {
    returnDefaultOnNull?: boolean
    default?: ParsedType
}

export class TypeBoolean extends TypeBase<NonNullable<ParsedType>> {
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

    default(defaultValue: PostValidations['default']) {
        this.postValidations.default = defaultValue
        return this
    }

    async parse(payload: unknown): Promise<ParsedType> {
        try {
            let value: ParsedType
            if (!_.isBoolean(payload)) {
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
                    payload = payload.trim().toLowerCase()
                    if (payload === 'true') {
                        value = true
                    } else if (payload === 'false') {
                        value = false
                    } else {
                        throw new Error(`${payload} not allowed`)
                    }
                } else {
                    throw new Error(`${typeof payload} type not allowed`)
                }
            } else {
                value = payload
            }

            return value
        } catch (err) {
            throw err
        }
    }
}
