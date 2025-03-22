import {Collaborator} from "../Collaborator";

export default abstract class CollaboratorStringPattern {

    /**
     * Will match names with any number of words and some special characters. Won't match a single space character.
     * Will match names like Ke$ha, 6ix9ine, P!nk, will.i.am.
     */
    static nameRegex = "[\\w'\"\\-.$!*\\d]+(?: [\\w'\"\\-.$!*\\d]+)*";

    /**
     * Tries to match the given line of a collaborator string.
     * If it matches, returns the list of collaborators, otherwise returns undefined.
     * @param collaboratorStringLine
     */
    abstract match(collaboratorStringLine: string): Collaborator[] | undefined;

}
