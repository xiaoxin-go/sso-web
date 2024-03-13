export const format = (str: string): string => {
    if (str === '') return ''
    return new Date(str).toLocaleString()
}
