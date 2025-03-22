import {Collaborator} from "./Collaborator";
import CollaboratorStringPattern from "./CollaboratorStringPattern/CollaboratorStringPattern";
import ActorPattern from "./CollaboratorStringPattern/ActorPattern";
import FunctionNamePattern from "./CollaboratorStringPattern/FunctionNamePattern";

const collaboratorStringPatterns: CollaboratorStringPattern[] = [ // any new patterns can be implemented and added here
    new ActorPattern(),
    new FunctionNamePattern()
]; // order is important: most to least strict

export const parse = (text?: string): Collaborator[] => {
    if (!text || text === "") {
        return [];
    }

    const collaborators: Collaborator[] = [];

    for (const line of text.split("\n")) {
        for (const pattern of collaboratorStringPatterns) {
            const foundCollaborators = pattern.match(line);
            if (foundCollaborators) {
                collaborators.push(...foundCollaborators);
                break;
            }
        }
    }

    return collaborators;
};
