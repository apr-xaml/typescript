"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const From_1 = require("../linq/From");
const GROUP_OF_ANY_CHARS = "(.*)";
function extractMiddleSubstring(start, end, toAnalyze) {
    const startReplaced = _replaceSpecialChars(start);
    const endReplaced = _replaceSpecialChars(end);
    const pattern = `${startReplaced}${GROUP_OF_ANY_CHARS}${endReplaced}`;
    const res = toAnalyze.match(pattern);
    if (res != null) {
        const [all, group] = res;
        return group;
    }
}
exports.extractMiddleSubstring = extractMiddleSubstring;
function _replaceSpecialChars(value) {
    const NOT_FOUND = (-1);
    const SPECIAL_CHARS = ["(", ")"];
    function __infixWithSlashIfOnAList(x) {
        if (SPECIAL_CHARS.indexOf(x) == NOT_FOUND) {
            return x;
        }
        else {
            return `\\${x}`;
        }
    }
    const replaced = From_1.linqFrom(value.split(''))
        .select(__infixWithSlashIfOnAList)
        .go();
    return replaced.join('');
}
//# sourceMappingURL=regex.js.map