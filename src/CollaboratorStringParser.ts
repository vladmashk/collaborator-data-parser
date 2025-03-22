import {Collaborator} from "./Collaborator";
import {FunctionCode} from "./types";

const cutIt = (text?: string): string[] => {
    if (text && text != "") {
        const cutters = [" en ", " of ", " door ", ";", ":", ",", " o.a. ", "\n"];
        for (let i = 0; i < cutters.length; i++) {
            const chunkSplit = cutters[i];
            if (text.includes(chunkSplit)) {
                const first = text.substring(0, text.indexOf(chunkSplit));
                const second = text.substring(text.indexOf(chunkSplit) + chunkSplit.length);
                const splitFirst = cutIt(first);
                const splitSecond = cutIt(second);
                return [...splitFirst, ...splitSecond];
            }
        }
        return [text.trim()];
    } else {
        return [""];
    }
};

export const parse = (text?: string) => {
    const parts = cutIt(text);
    const collaborators: Collaborator[] = [];
    let fun: FunctionCode | undefined = undefined;
    for (const part1 of parts) {
        if (part1 === "Met" ||
            part1 === "Regie" ||
            part1 === "Presentatie" ||
            part1 === "Commentaar" ||
            part1 === "Scenario" ||
            part1 === "Verteld" ||
            part1 === "Host" ||
            part1 === "Script writer" ||
            part1 === "Director" ||
            part1 === "Stemmen" ||
            part1 === "Vertelstem" ||
            part1 === "Ingelezen") {
            let result: FunctionCode | undefined = "NAR";
            if (part1 === "Met") {
                result = "ACT";
            } else if (part1 === "Regie") {
                result = "REG";
            } else if (part1 === "Presentatie") {
                result = "PRS";
            } else if (part1 === "Commentaar") {
                result = "CMM";
            } else if (part1 === "Scenario") {
                result = "SCN";
            } else if (part1 !== "Verteld") {
                if (part1 === "Host") {
                    result = "PRS";
                } else if (part1 === "Script writer") {
                    result = "SCN";
                } else if (part1 === "Director") {
                    result = "REG";
                } else if (part1 === "Stemmen") {
                    result = "ACT";
                } else if (part1 !== "Vertelstem") {
                    if (part1 !== "Ingelezen") {
                        result = fun;
                    }
                }
            }
            fun = result;
        } else if (fun !== undefined && part1 !== undefined && part1 !== "") {
            const e = Collaborator.getInstance();
            if (part1.includes("(") && part1.includes(")")) {
                const name1 = part1.substring(0, part1.indexOf("("));
                const char1 = part1.substring(part1.indexOf("(") + 1, part1.indexOf(")")).trim();
                e.fullName = name1;
                e.character = char1;
                e.functionCode = fun;
            } else if (part1.includes("[") && part1.includes("]")) {
                const name1 = part1.substring(0, part1.indexOf("["));
                const char1 = part1.substring(part1.indexOf("[") + 1, part1.indexOf("]")).trim();
                e.fullName = name1;
                e.character = char1;
                e.functionCode = fun;
            } else {
                e.fullName = part1;
                e.functionCode = fun;
            }

            let found = false;
            for (const filterName of ["e.a.", "..."]) {
                if (e.fullName.toLowerCase() === filterName) {
                    found = true;
                }
            }
            if (!found) {
                collaborators.push(e);
            }
        }
    }
    return collaborators;
};
