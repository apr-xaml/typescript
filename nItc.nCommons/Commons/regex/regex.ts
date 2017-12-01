import { _ASSERT_SINGLE_ITEM } from "../Commons.Assertions";
import { linqFrom } from "../linq/From";

const GROUP_OF_ANY_CHARS = "(.*)";

export function extractMiddleSubstring(start: string, end: string, toAnalyze: string): (string | undefined)
{
    const startReplaced = _replaceSpecialChars(start);
    const endReplaced = _replaceSpecialChars(end);

    const pattern = `${startReplaced}${GROUP_OF_ANY_CHARS}${endReplaced}`;
    const res = toAnalyze.match(pattern);

    if (res != null)
    {
        const [all, group] = res; 
        return group;
    }
}


function _replaceSpecialChars(value: string): string
{
    const NOT_FOUND = (-1);
    const SPECIAL_CHARS = ["(", ")"];

    function __infixWithSlashIfOnAList(x: string): string
    {
        if (SPECIAL_CHARS.indexOf(x) == NOT_FOUND)
        {
            return x;
        }
        else
        {
            return `\\${x}`;
        }

    }

    const replaced = linqFrom(value.split(''))
        .select(__infixWithSlashIfOnAList)
        .go();

    return replaced.join('');
}
