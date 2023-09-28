"use client"

import React, {useCallback, useEffect, useState} from "react";

import {CarTest} from "@/lib/types";
import {useOrigin} from "@/hooks/use-origin";
import {useToast} from "@/components/ui/use-toast";
import CarTest1Item from "@/components/car/test/car-test1-item";
import {Button} from "@/components/ui/button";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {useCarTests} from "@/hooks/use-car-tests";
import {useStore} from "zustand";
import {Statistics, useStatistics} from "@/hooks/use-statistics";
import {store} from "next/dist/build/output/store";

export interface CarTestProps {
    url: string
    title: string
    storeKey: "test1" | "test4"
    setStoreKey: "setTest1" | "setTest4"
    clearKey: "clearTest1" | "clearTest4"
}

export const CarTestPage = ({
                                url,
                                title,
                                storeKey,
                                setStoreKey,
                                clearKey
                            }: CarTestProps) => {
    const origin = useOrigin()
    const {toast} = useToast()
    //使用被管理的状态来完成对它的统计
    const carTests = useCarTests()
    const testPack = carTests[storeKey];
    const setTestPack = carTests[setStoreKey]
    //数据统计api
    const {getStatisticsByKey, setStatisticsByKey,removeStatisticsByKey} = useStatistics()
    //初始化统计数据
    //如果数据不存在，则对数据进行初始化。
    useEffect(() => {
        console.log(getStatisticsByKey(storeKey))
        if (!getStatisticsByKey(storeKey)) {
            setStatisticsByKey(storeKey, {
                successIds: [],
                failedIds: [],
                answeredIds: [],
                currentId: ""
            })
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    //获取题目位置
    const getCurrentOffset = useCallback(() => {
        const statistics = getStatisticsByKey(storeKey)
        if (!statistics) return 0
        if (statistics.currentId=="") return 0
        return statistics.answeredIds.findIndex((id)=>id===statistics.currentId);
    }, [getStatisticsByKey, storeKey]);
    //当前游标
    const [offset, setOffset] = useState(getCurrentOffset())
    const currentTest = testPack?.test[offset]
    const [mounted, isMounted] = useState(false)

    const getData = async () => {
        const response = await fetch(`${origin}${url}`)
        const carTest1Data: CarTest[] = await response.json()
        return carTest1Data
    }

    useEffect(() => {
        isMounted(true)
    }, []);


    useEffect(() => {
        if (!testPack) {
            const fetchData = async () => {
                const data = await getData()
                setTestPack({
                    test: data,
                })
                //在40行已经对数据进行了初始化，所以这里不会为空
                //将当前回答的id设置到存储中。
                const statistics = getStatisticsByKey(storeKey);
                if (statistics!.currentId == "") {
                    statistics!.currentId = data[0].id
                    console.log(`ser`,statistics)
                    setStatisticsByKey(storeKey, statistics!)
                }
            }
            fetchData().catch(err => toast({
                variant: "destructive",
                title: "发生了一点异常",
                description: err.message,
            }))
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    // show keyboard prompt
    useEffect(() => {
        setTimeout(() => {
            toast({
                variant: "default",
                title: "提示!",
                description: "使用键盘快捷键abcd可快速答题，使用n和m可快速切换上一个和下一个题目"
            })
        }, 3 * 1000)

    }, [toast]);


    const statistics = getStatisticsByKey(storeKey)!

    const nextClick = useCallback(() => {
        setOffset(offset + 1)

        statistics.currentId = currentTest?.id || ""
        setStatisticsByKey(storeKey,statistics)
    }, [currentTest?.id, offset, setStatisticsByKey, statistics, storeKey])

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

    const successAnswerCount = useCallback(() => {
        return statistics.successIds.length
    }, [statistics?.successIds.length]);

    const failAnswerCount = useCallback(() => {
        return statistics.failedIds.length
    }, [statistics?.failedIds.length]);

    const oldAnswerCount = useCallback(() => {
        return statistics.answeredIds.length
    }, [statistics?.answeredIds.length]);

    const reset = useCallback(() => {
        carTests[clearKey]()
        removeStatisticsByKey(storeKey)
        window.location.reload()
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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

    if (!mounted) {
        return null
    }
    if (!testPack) {
        return null
    }

    if (currentTest == null) {
        return (
            <Button variant="green"
                    onClick={reset}>
                再来一次
            </Button>
        )
    }

    const onSuccess = (id: string) => {
        const {successIds, answeredIds} = statistics
        successIds.push(id)
        answeredIds.push(id)
        setStatisticsByKey(storeKey, statistics)
        nextClick()
    }

    const onFail = (id: string) => {
        const {failedIds, answeredIds} = statistics
        failedIds.push(id)
        answeredIds.push(id)
        setStatisticsByKey(storeKey, statistics)
        let answer = currentTest.items.filter(item => currentTest.multiChoiceAnswer.startsWith(item.symbol))[0].name
        answer = answer.substring(answer.indexOf("：") + 1, answer.length)
        toast({
            title: answer,
            variant: "destructive",
            description: currentTest.qname
        })
        nextClick()
    }


    return (
        <div className="p-6">
            <p className="text-center h-full">
                {title}
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
            <div className="fixed top-0 right-0 p-3">
                <Button variant="green" onClick={reset}>
                    再来一套
                </Button>
            </div>
            <div className="fixed bottom-0 right-0 flex justify-end p-3">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <div role="button" tabIndex={0} className="mr-2 h-1/2 p-6 w-auto bg-blue-600
                             hover:bg-blue-600/90 dark:bg-white dark:hover:bg-zinc-400 text-white dark:text-zinc-500 rounded
                             flex items-center justify-center" onClick={prevClick}>
                                <p>上一题</p>
                            </div>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>使用快捷键n可返回上一题</p>
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger>
                            <div role="button" tabIndex={0} className="ml-2 h-1/2 p-6 w-auto bg-blue-600
                             hover:bg-blue-600/90 dark:bg-white dark:hover:bg-zinc-400 rounded text-white dark:text-zinc-500
                             flex items-center justify-center" onClick={nextClick}>
                                <p>下一题</p>
                            </div>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>使用快捷键m可前往下一题</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
            <div className="fixed bottom-0 p-3 md:font-mono">
                分数:
                <span className="font-bold">{successAnswerCount()}/{testPack.test.length}</span>
                错误:
                <span className="font-bold">{failAnswerCount()}</span>
                <div/>
                已答:
                <span className="font-bold">{oldAnswerCount()}</span>
                第<span className="font-bold">{offset + 1}</span>题
            </div>
        </div>
    )
}
