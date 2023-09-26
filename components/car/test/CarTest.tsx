"use client"

import React, {useCallback, useEffect, useState} from "react";

import {CarTest} from "@/lib/types";
import {useOrigin} from "@/hooks/use-origin";
import {useToast} from "@/components/ui/use-toast";
import CarTest1Item from "@/components/car/test/car-test1-item";
import {Button} from "@/components/ui/button";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";

export interface CarTestProps {
    url: string
    title: string
}

export const CarTestPage = ({
                                url,
                                title
                            }: CarTestProps) => {
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
        const response = await fetch(`${origin}${url}`).then()
        const carTest1Data: CarTest[] = await response.json()
        return carTest1Data
    }

    const prevClick = useCallback(() => {
        if (offset != 0) {
            setOffset(offset - 1)
        } else {
            toast({
                title: "已经是第一题了",
                variant: "destructive",
                description: "上一题？没有！"
            })
        }
    }, [offset, toast])

    const nextClick = useCallback(() => {
        setOffset(offset + 1)
    }, [offset])

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
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setTimeout(()=>{
            toast({
                variant:"default",
                title:"提示!",
                description:"使用键盘快捷键abcd可快速答题，使用n和m可快速切换上一个和下一个题目"
            })
        },0.25)

    }, [toast]);

    const handleKeyUpProcess = useCallback((e: KeyboardEvent) => {
        switch (e.key) {
            case 'n': {
                prevClick()
                break
            }
            case 'm': {
                nextClick()
                break
            }
            default:
                break
        }
    }, [nextClick, prevClick]);

    useEffect(() => {
        document.addEventListener("keyup", handleKeyUpProcess, false)
        return () => {
            document.removeEventListener("keyup", handleKeyUpProcess, false)
        }
    }, [handleKeyUpProcess]);


    if (!carTests) {
        return null
    }

    const currentTest = carTests[offset]

    const onSuccess = (id: string) => {
        setMap(map.set(id, true))
        nextClick()
    }

    const onFail = (id: string) => {
        setErrorCount(errorCount + 1)
        let answer = currentTest.items.filter(item => currentTest.multiChoiceAnswer.startsWith(item.symbol))[0].name
        answer = answer.substring(answer.indexOf("：") + 1, answer.length)
        toast({
            title: answer,
            variant: "destructive",
            description: currentTest.qname
        })
    }


    return (
        <div className="p-6">
            <p className="text-center h-full">
                {title}
            </p>
            <div>
                {currentTest == null && (
                    <Button variant="green"
                            onClick={() => {
                                window.location.reload()
                            }}>
                        再来一次
                    </Button>
                )}
                {currentTest !=null &&(
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
                )}
            </div>
            <div className="fixed bottom-0 right-0 flex justify-end">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <Button className="mr-2 h-20 w-40 md:h-15 md:w-25" onClick={prevClick}>
                                上一题
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>使用快捷键n可返回上一题</p>
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger>
                            <Button className="ml-2 h-20 w-40 md:h-15 md:w-25" onClick={nextClick}>
                                下一题
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>使用快捷键m可前往下一题</p>
                        </TooltipContent>
                    </Tooltip>


                </TooltipProvider>
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
