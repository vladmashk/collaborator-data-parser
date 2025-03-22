import CollaboratorStringPattern from "./CollaboratorStringPattern";
import {Collaborator} from "../Collaborator";

/**
 * Matches patterns like "Host: Peppe Giacomazza, Script writer: hans bourlon"
 */
export default class FunctionNamePattern extends CollaboratorStringPattern {

    match(collaboratorStringLine: string): Collaborator[] | undefined {
        return undefined;
    }

}
