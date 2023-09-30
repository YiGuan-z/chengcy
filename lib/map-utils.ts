export const mapToArray = (map?: Map<unknown, unknown>) => {
    if (!map) {
        return []
    }
    const array = new Array(map.size * 2);
    let offset = 0
    map.forEach((value, key, map) => {
        array[offset++] = key
        array[offset++] = value
    })
    return array
}