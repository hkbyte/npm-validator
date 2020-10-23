export declare type PathErrorObject = {
    field: string;
    message: string;
};
export declare class ParsingError extends Error {
    path?: PathErrorObject[];
    constructor(message: string, path?: PathErrorObject[]);
}
