import CollaboratorStringPattern from "./CollaboratorStringPattern";
import {Collaborator} from "../Collaborator";

/**
 * Matches patterns like "Met: Eugene Levy (Johnny Rose) en Catherine O'Hara (Moira Rose)"
 * and "Stemmen: Jan Maillard (Bumba), Jan Van Looveren (Bumbalu), Britt Van Der Borght (Bumbina)"
 */
export default class ActorPattern extends CollaboratorStringPattern {

    match(collaboratorStringLine: string): Collaborator[] | undefined {
        collaboratorStringLine = collaboratorStringLine.trim();
        if (!/^(met|stemmen)/i.test(collaboratorStringLine)) {
            return undefined;
        }

        const collaboratorStrings = collaboratorStringLine
            .replace(/(met|stemmen)(: ?| o.a. | )/i, "")
            .replace(/( e.a.|, ?\.\.\.)/, "")
            .split(/(?:, ?| en )/);

        const pattern = new RegExp(`(${ActorPattern.nameRegex})(?: [(\\[](${ActorPattern.nameRegex})[)\\]])?`, "gui");

        const collaborators: Collaborator[] = [];
        for (const collaboratorString of collaboratorStrings) {
            const foundMatch = pattern.exec(collaboratorString);
            if (!foundMatch) {
                return undefined;
            }
            collaborators.push(new Collaborator(foundMatch[1], foundMatch[2], "ACT"));
            pattern.lastIndex = 0;
        }

        return collaborators;
    }

}
