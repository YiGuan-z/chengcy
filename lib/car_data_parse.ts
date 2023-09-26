import {fetch} from "next/dist/compiled/@edge-runtime/primitives";
import * as cheerio from "cheerio";

export class CarDataParse {
    constructor(
        private readonly requestAddress: string,
        private readonly jsonMatch: RegExp = /JSON\.parse\((.*?)\)/) {
        if (!requestAddress) {
            throw new Error("api address is null, please check this address")
        }
    }

    private async getHtml() {
        return fetch(this.requestAddress, {method: "GET"})
    }

    public async getJSONByParseHtml() {
        const html = await this.getHtml()
        const $ = cheerio.load(await html.text())
        const script = $('script').text()
        const result = script.match(this.jsonMatch)
        if (!result) {
            throw new Error("出现错误，请联系管理员进行处理")
        }
        let element = result[1];
        element = element.substring(1, element.length - 1)
        return JSON.parse(element);
    }

}