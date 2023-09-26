"use client"

import {CarTest} from "@/types";
import {useOrigin} from "@/hooks/use-origin";
import {useEffect, useState} from "react";
import {useToast} from "@/components/ui/use-toast";
import CarTest1Item from "@/components/car/test/car-test1-item";
import {Button} from "@/components/ui/button";

const CarTest4 = () => {
    const origin = useOrigin()
    const {toast} = useToast()
    const [carTests, setCarTests] = useState<CarTest[] | null>(null)
    //使用一个map来统计完成度，key为id，value为完成状态，同时需要有一个游标来定位题目
    const [map, setMap] = useState<Map<string, boolean>>(new Map())
    //当前游标
    const [offset, setOffset] = useState(0)
    //错误数量
    const [errorCount, setErrorCount] = useState(0)

    const getData = async () => {
        const response = await fetch(`${origin}/api/car-item-bank/test4`).then()
        const carTest1Data: CarTest[] = await response.json()
        return carTest1Data
    }

    useEffect(() => {
        const fetchData = async () => {
            const data = await getData()
            setCarTests(data)
        }
        fetchData().catch(err => toast({
            variant: "destructive",
            title: "发生了一点异常",
            description: err.message,
        }))
    }, []);

    if (!carTests) {
        return null
    }

    const prevClick = () => {
        if (offset != 0) {
            setOffset(offset - 1)
        } else {
            toast({
                title: "已经是第一题了",
                variant: "destructive",
                description: "上一题？没有！"
            })
        }
    }

    const nextClick = () => {
        setOffset(offset + 1)
    }


    const currentTest = carTests[offset]

    const onSuccess=(id:string)=>{
        setMap(map.set(id, true))
        nextClick()
    }

    const onFail=(id:string)=>{
        setErrorCount(errorCount+1)
        let answer = currentTest.items.filter(item=>currentTest.multiChoiceAnswer.startsWith(item.symbol))[0].name
        answer=answer.substring(answer.indexOf("：")+1,answer.length)
        toast({
            title: answer,
            variant: "destructive",
            description: currentTest.qname
        })
    }

    return (
        <div className="p-6">
            <p className="text-center h-full">
                科目一测试
            </p>
            <div>
                <CarTest1Item
                    key={currentTest.id}
                    item={currentTest}
                    onSuccess={({id}) => {
                        onSuccess(id)
                    }}
                    onFail={({id}) => {
                        onFail(id)
                    }}
                    disable={!currentTest}
                />
            </div>
            <div className="ml-auto flex justify-end mr-2">
                <Button className="mr-2" onClick={prevClick}>
                    上一题
                </Button>
                <Button className="ml-2" onClick={nextClick}>
                    下一题
                </Button>
            </div>
            <div className="fixed bottom-0">
                当前已答:
                <span className="font-bold">{map.size}/{carTests.length}</span>
                <div/>
                第<span className="font-bold">{offset + 1}</span>题
                错误:
                <span className="font-bold">{errorCount}</span>
            </div>
        </div>
    )
}

export default CarTest4