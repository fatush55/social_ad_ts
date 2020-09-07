export const range = (start: number, end: number): Array<number>  => {
    return [...Array(end).keys() as any].map(elem => elem + start)
}

export const setRoundingUp = (totalItems: number | null, countItems: number): number => {
    if (totalItems) return Math.ceil( totalItems/ countItems)
    return 0
}
