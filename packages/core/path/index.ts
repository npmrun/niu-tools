// https://github.com/rollup/rollup/blob/fec513270c6ac350072425cc045db367656c623b/src/utils/sanitizeFileName.ts

const INVALID_CHAR_REGEX = /[\u0000-\u001F"#$&*+,:;<=>?[\]^`{|}\u007F]/g
const DRIVE_LETTER_REGEX = /^[a-z]:/i

/**
 * 清理无效的文件名，防止使用非法字符串导致文件创建失败
 */
export function sanitizeFileName(name: string): string {
    const match = DRIVE_LETTER_REGEX.exec(name)
    const driveLetter = match ? match[0] : ''

    return (
        driveLetter +
        name
            .slice(driveLetter.length)
            .replace(INVALID_CHAR_REGEX, '_')
            .replace(/(^|\/)_+(?=[^/]*$)/, '$1')
    )
}
/**
 * 统一斜杠
 */
export function slash(p: string): string {
    return p.replace(/\\/g, '/')
}
