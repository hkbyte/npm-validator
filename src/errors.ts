export type PathErrorObject = {
    field: string
    message: string
}

export class ParsingError extends Error {
    path?: PathErrorObject[]
    constructor(message: string, path?: PathErrorObject[]) {
        super(message)
        this.path = path
    }
}
