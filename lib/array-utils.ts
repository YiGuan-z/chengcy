export const arrayToMap = (array: Array<unknown>) => {
    const result = new Map<unknown, unknown>()
    // key, value 0 == key 1 == value 2 == key 3 == value
    for (let i = 0; i < array.length; i++) {
        if (isKey(i)) {
            result.set(array[i], array[i + 1])
        }
    }
    return result
}
const isKey = (offset: number) => {
    return offset % 2 == 0
}