import {fetch} from "next/dist/compiled/@edge-runtime/primitives";
import * as cheerio from "cheerio"
import {json} from "node:stream/consumers";
import {NextResponse} from "next/server";

const requestAddress = "https://mnks.jxedt.com/ckm1/mnks/"
const jsonMatch = /JSON\.parse\((.*?)\)/

export async function GET(req: Request) {
    const response = await getHtml(requestAddress);
    return getJSONByParseHtml(await response.text())
}

const getHtml = async (url: string) => {
    return fetch(url, {method: "GET"})
}

const getJSONByParseHtml = (html: string) => {
    try {
        const $ = cheerio.load(html)
        const script = $('script').text()
        const result = script.match(jsonMatch)
        if (!result) {
            return new NextResponse("出现错误，请发联系管理员进行处理", {status: 500})
        }
        let element = result[1];
        element = element.substring(1, element.length - 1)
        const data = JSON.parse(element);
        return NextResponse.json(data)
    } catch (e) {
        console.error("[CAR_DATA_GET_ERROR]", e)
        return new NextResponse("there is an error, please contact the admin to deal with it", {status: 500})
    }
}