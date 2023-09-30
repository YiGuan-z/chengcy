export type char = string

export class CharArray {
    private _char: char[] = []

    constructor(str: string) {
        this.parseStrToChar(str)
    }

    private parseStrToChar(str: string) {
        for (let i = 0; i < str.length; i++) {
            this._char.push(str[i])
        }
    }

    public indexOf(c: char): number {
        for (let i = 0; i < this._char.length; i++) {
            const element = this._char[i];
            if (element === c) {
                return i
            }
        }
        return -1
    }

    public lastIndexOf(c: char): number {
        for (let i = this._char.length - 1; i >= 0; i--) {
            const element = this._char[i];
            if (element === c) {
                return i
            }
        }
        return -1
    }

    public firstHas(c: char): boolean {
        for (let i = 0; i < this._char.length; i++) {
            const charElement = this._char[i];
            if (charElement === c) {
                return true
            }
        }
        return false
    }

    public lastHas(c: char): boolean {
        for (let i = this._char.length - 1; i >= 0; i--) {
            const charElement = this._char[i];
            if (charElement === c) {
                return true
            }
        }
        return false
    }

    public joinToString(separator?: char): string {
        return this._char.join(separator)
    }
}

export const strToCharSequence = (str:string) => new CharArray(str)