import _ from 'lodash'
import { TypeBase } from '../base'

type ParsedType = any | null | undefined

type PreValidations = {
    nullable?: boolean
    optional?: boolean
}

type PostValidations = {
    returnDefaultOnNull?: boolean
    default?: ParsedType
}

export class TypeAny extends TypeBase<NonNullable<ParsedType>> {
    private preValidations: PreValidations
    private postValidations: PostValidations

    constructor() {
        super()

        this.preValidations = {}
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

    async parse(payload: any): Promise<ParsedType> {
        try {
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
            }

            return payload
        } catch (err) {
            throw err
        }
    }
}
