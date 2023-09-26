import {CarTest} from "@/types";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import Image from "next/image";

export interface CarTest1ItemProps {
    item?: CarTest
    onSuccess: (resolve: CarTest) => void
    onFail: (resolve: CarTest) => void
    disable: boolean,
}

const CarTest1Item = ({
                          item,
                          onSuccess,
                          onFail,
                          disable,
                      }: CarTest1ItemProps) => {
    const router = useRouter();

    if (!item) {
        return (
            <Button variant="green"
                    onClick={() => {
                        window.location.reload()
                    }}>
                再来一次
            </Button>
        )
    }
    const {multiChoiceAnswer} = item;

    const onClick = (symbol: string) => {
        if (multiChoiceAnswer === symbol) {
            onSuccess(item)
        } else {
            onFail(item)
        }
    }

    return (
        <div className="h-full w-9/12">
            <div className="p-6">
                <div>
                    {item?.qname}
                    {item.imgurl != "" &&(
                        <Image
                            width={400}
                            height={600}
                            src={item.imgurl}
                            alt={item?.qname}
                        />
                    )}
                </div>
                <div className="flex flex-wrap justify-around p-6 ">
                    {item?.items?.map(item => (
                        <Button
                            className="text-white bg-emerald-600 hover:bg-emerald-700
                             focus:ring-4 focus:ring-emerald-500 font-medium rounded-lg
                             w-5/12 h-1/2 mt-4
                             "
                            key={item.symbol}
                            onClick={() => onClick(item.symbol)}>
                            {item.name}
                        </Button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CarTest1Item