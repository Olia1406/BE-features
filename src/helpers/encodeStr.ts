import * as md5 from 'md5';

export function encodeStr(str: string) {
    return md5( str + 'qwerty')
}