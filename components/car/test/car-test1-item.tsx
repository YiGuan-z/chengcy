import {CarTest} from "@/lib/types";
import {Button} from "@/components/ui/button";
import Image from "next/image";
import {useCallback, useEffect} from "react";

export interface CarTest1ItemProps {
    item: CarTest
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
    const {multiChoiceAnswer} = item

    const onClick = useCallback((symbol:string) => {
        const symbol1 = symbol.toUpperCase();
        if (multiChoiceAnswer === symbol1) {
            onSuccess(item)
        } else {
            onFail(item)
        }
    }, [item, multiChoiceAnswer, onFail, onSuccess]);

    const handleKeyBordProcess = useCallback((e: KeyboardEvent) => {
        switch (e.key) {
            case 'a':
            case 'b':
            case 'c':
            case 'd':
            case 'A':
            case 'B':
            case 'C':
            case 'D': {
                onClick(e.key)
            }
        }
    }, [onClick]);

    useEffect(() => {
        window.addEventListener("keyup", handleKeyBordProcess, false)
        return () => {
            window.removeEventListener("keyup", handleKeyBordProcess, false)
        }
    }, [handleKeyBordProcess]);

    return (
        <div className="h-full w-9/12">
            <div className="p-6">
                <div>
                    {item?.qname}
                    {item.imgurl != "" && (
                        <Image src={item.imgurl} width={600} height={300} className="w-auto h-auto" alt={item.qname}/>
                    )}
                </div>
                <div className="flex flex-wrap justify-around p-6 ">
                    {item?.items?.map(item => (
                        <Button
                            className="text-white bg-emerald-600 hover:bg-emerald-700
                             focus:ring-4 focus:ring-emerald-500 font-medium rounded-lg
                             w-5/12 h-1/2 mt-4
                             md:w-1/3 md:h-1/4
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