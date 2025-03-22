import CollaboratorStringPattern from "./CollaboratorStringPattern";
import {Collaborator} from "../Collaborator";
import {FunctionCode} from "../types";

/**
 * Matches patterns like "Host: Peppe Giacomazza, Script writer: hans bourlon"
 */
export default class FunctionNamePattern extends CollaboratorStringPattern {

    functionMap = new Map<string, FunctionCode>([
        ["regie:", "REG"],
        ["director:", "REG"],
        ["presentatie:", "PRS"],
        ["host:", "PRS"],
        ["scenario:", "SCN"],
        ["script writer:", "SCN"],
        ["commentaar:", "CMM"],
        ["stemmen:", "ACT"],
        ["vertelstem:", "NAR"],
        ["verteld door", "NAR"],
        ["ingelezen door", "NAR"]
    ]);

    functionNameRegex = [...this.functionMap.keys()].join("|");

    match(collaboratorStringLine: string): Collaborator[] | undefined {
        const parts = collaboratorStringLine.trim().split(new RegExp(`(?:, )?(${this.functionNameRegex}) ?`, "i"));
        if (parts[0] !== "") {
            return undefined; // there was no known function name at the start of the line
        }

        const collaborators: Collaborator[] = [];

        let currentFunctionCode: FunctionCode | undefined = undefined;
        for (const part of parts.slice(1)) {
            if (!currentFunctionCode) { // reading function
                if (!this.functionMap.has(part.toLowerCase())) {
                    return undefined;
                }
                currentFunctionCode = this.functionMap.get(part.toLowerCase());
            } else { // reading names
                const names = part.split(new RegExp(" en | of |, "));
                collaborators.push(...names.map(name => new Collaborator(name, undefined, currentFunctionCode!)));
                currentFunctionCode = undefined;
            }
        }

        return collaborators;
    }

}
