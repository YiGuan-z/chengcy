//想要扩展方法，但是，好麻烦。
export {}
declare global {
    interface Array<T> {
        toMap<L, R>(): Map<L, R>
    }
}
Array.prototype.toMap = function () {
    const result = new Map<unknown, unknown>()
    // key, value 0 == key 1 == value 2 == key 3 == value
    for (let i = 0; i < this.length; i++) {
        if (isKey(i)) {
            result.set(this[i], this[i + 1])
        }
    }
    return result
}
const isKey = (offset: number) => {
    return offset % 2 == 0
}