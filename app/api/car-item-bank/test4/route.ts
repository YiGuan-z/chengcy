import {NextResponse} from "next/server";
import {CarDataParse} from "@/lib/car_data_parse";

const requestAddress = "https://mnks.jxedt.com/ckm4/mnks/"
const jsonMatch = /JSON\.parse\((.*?)\)/

export async function GET(req: Request) {
    try {
        const carParse = new CarDataParse(requestAddress)
        const data = await carParse.getJSONByParseHtml()
        return NextResponse.json(data)
    } catch (e) {
        console.error("[CAR_DATA_GET_ERROR]", e)
        return new NextResponse("there is an error, please contact the admin to deal with it", {status: 500})
    }
}
