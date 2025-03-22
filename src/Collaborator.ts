import {FunctionCode} from "./types";

export class Collaborator {

    fullName: string;

    character?: string;

    functionCode: FunctionCode;

    constructor(fullName: string, character: string | undefined, functionCode: FunctionCode) {
        this.fullName = fullName;
        this.character = character;
        this.functionCode = functionCode;
    }

    public static getInstance() {
        return {} as Collaborator;
    }

    public toString() {
        return `Collaborator{fullName='${this.fullName}', functionCode='${this.functionCode}', character='${this.character}'}`;
    }
}
