import CollaboratorStringPattern from "./CollaboratorStringPattern";
import {Collaborator} from "../Collaborator";

/**
 * Matches patterns like "Met: Eugene Levy (Johnny Rose) en Catherine O'Hara (Moira Rose)"
 */
export default class MetPattern extends CollaboratorStringPattern {

    match(collaboratorStringLine: string): Collaborator[] | undefined {
        collaboratorStringLine = collaboratorStringLine.trim();
        if (!collaboratorStringLine.toLowerCase().startsWith("met")) {
            return undefined;
        }

        const collaboratorStrings = collaboratorStringLine
            .replace(/met(: ?| o.a. | )/i, "")
            .replace(/( e.a.|, ?\.\.\.)/, "")
            .split(/(?:, ?| en )/);

        const pattern = new RegExp(`(${this.nameRegex})(?: \\((${this.nameRegex})\\))?`, "gui");

        const collaborators: Collaborator[] = [];
        for (const collaboratorString of collaboratorStrings) {
            const foundMatch = pattern.exec(collaboratorString);
            if (!foundMatch) {
                return undefined;
            }
            collaborators.push(new Collaborator(foundMatch[1], foundMatch[2], "ACT"))
        }

        return collaborators;
    }

}
