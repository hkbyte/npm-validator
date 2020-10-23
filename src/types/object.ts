import _ from 'lodash'
import { TypeBase } from '../base'
import { ParsingError } from '../errors'

export type TypeObjectSchema = {
    [name: string]: TypeBase<unknown>
}

type ParsedType = object | null | undefined

type PreValidations = {
    nullable?: boolean
    optional?: boolean
    nonEmpty?: boolean
    nonStrict?: boolean
}

type Validations = {}

type PostValidations = {
    returnDefaultOnEmpty?: boolean
    returnDefaultOnNull?: boolean
    default?: ParsedType
}

export class TypeObject extends TypeBase<NonNullable<ParsedType>> {
    private preValidations: PreValidations
    private postValidations: PostValidations
    private schema: TypeObjectSchema

    constructor(schema: TypeObjectSchema) {
        super()

        this.schema = schema
        this.preValidations = {}
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

    nonStrict() {
        this.preValidations.nonStrict = true
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
            let parsedObject: ParsedType = {}

            if (!_.isObject(payload)) {
                if (_.isUndefined(payload)) {
                    if (this.preValidations.optional) {
                        return this.postValidations.default
                    }
                    throw new Error('undefined value not allowed')
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

            if (!this.preValidations.nonStrict) {
                for (let key in Object.keys(payload)) {
                    if (!_.hasIn(this.schema, key)) {
                        throw new Error(`${key}: is not allowed`)
                    }
                }
            }

            for (const el of Object.entries(this.schema)) {
                try {
                    const parsedFieldValue = await el[1].parse(
                        _.get(payload, el[0], undefined),
                    )

                    Object.assign(parsedObject, {
                        [el[0]]: parsedFieldValue,
                    })
                } catch (err) {
                    throw new ParsingError(`${el[0]}: ${err.message}`, [
                        {
                            field: el[0],
                            message: err.message,
                        },
                    ])
                }
            }

            return parsedObject
        } catch (err) {
            throw err
        }
    }
}
