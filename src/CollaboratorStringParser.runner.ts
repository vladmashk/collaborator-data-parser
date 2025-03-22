import {parse} from "./CollaboratorStringParser";

const collaboratorStrings = [
    undefined,
    "something that doesn't contain collaborators",
    "Met: Eugene Levy (Johnny Rose)",
    "Met: Eugene Levy (Johnny Rose) en Catherine O'Hara (Moira Rose)",
    "Met: Eugene Levy (Johnny Rose) en Catherine O'Hara (Moira Rose) en Dan Levy (David Rose)",
    "Met: Eugene Levy (Johnny Rose), Catherine O'Hara (Moira Rose) e.a.",
    "Regie: Gilles Santantonio",
    "Presentatie: Maarten Vangramberen",
    "Commentaar: Gert Gommé en Inge Van Meensel",
    "Commentaar: Kathleen Cools of Annelies Beck",
    "Scenario: Torfinnur Jákupsson",
    "Coaching: Wouter Deprez",
    "Verteld door David Attenborough",
    "Ingelezen door Vic De Wachter",
    "Met o.a. Rachel Bloom, Lynne Champlin,...",
    "Met: Eugene Levy (Johnny Rose), Catherine O'Hara (Moira Rose) e.a.\n" +
    "Commentaar: Gert Gommé en Inge Van Meensel\n" +
    "Presentatie: Annelies Beck",
    "Host:Peppe Giacomazza, Script writer:hans bourlon, Script writer:Gert Verhulst, Director:Jurgen Tellier",
    "Stemmen: Jan Maillard (Bumba), Jan Van Looveren (Bumbalu), Britt Van Der Borght (Bumbina)\n" +
    "Vertelstem: Marc Peeters"
];

for (const collaboratorString of collaboratorStrings) {
    const collaborators = parse(collaboratorString);

    console.log("Parsing: " + collaboratorString);
    for (const normalizedCollaborator of collaborators) {
        console.log(`${normalizedCollaborator.fullName} (${normalizedCollaborator.functionCode}) => ${normalizedCollaborator.character}`);
    }
    console.log("- - - - - - - - - - - - - - - - - - - - - - - - - - - ");
}
