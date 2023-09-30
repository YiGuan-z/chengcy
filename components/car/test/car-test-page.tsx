"use client"

import React, {useCallback, useEffect, useState} from "react";

import {CarTest} from "@/lib/types";
import {useOrigin} from "@/hooks/use-origin";
import {useToast} from "@/components/ui/use-toast";
import CarTest1Item from "@/components/car/test/car-test1-item";
import {Button} from "@/components/ui/button";
import {useCarTests} from "@/hooks/use-car-tests";
import {useStatistics} from "@/hooks/use-statistics";
import CarTestStatistics from "@/components/car/test/car-test-statistics";
import CarTestRightBottomButton from "@/components/car/test/car-test-right-bottom-button";

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
    const {getStatisticsByKey, setStatisticsByKey, hasKey, initStatisticsByKey} = useStatistics()
    //初始化统计数据
    //如果数据不存在，则对数据进行初始化。
    useEffect(() => {
        if (!hasKey(storeKey)) {
            initStatisticsByKey(storeKey)
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    //获取题目位置
    const getCurrentOffset = useCallback(() => {
        const statistics = getStatisticsByKey(storeKey)
        if (!statistics) return 0
        if (statistics.currentId == "") return 0
        return statistics.answeredIds.findIndex((id) => id === statistics.currentId) + 1;
    }, [getStatisticsByKey, storeKey]);
    //当前游标
    const [offset, setOffset] = useState(getCurrentOffset())
    const currentTest = testPack?.test[offset]
    const [mounted, isMounted] = useState(false)
    //音频
    // useSound()

    useEffect(() => {
        isMounted(true)
    }, []);

    useEffect(() => {
        const getData = async () => {
            const response = await fetch(`${origin}${url}`)
            const carTest1Data: CarTest[] = await response.json()
            return carTest1Data
        }
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

    const nextButton = useCallback(() => {
        setOffset(offset + 1)

        statistics.currentId = currentTest?.id || ""
        setStatisticsByKey(storeKey, statistics)
    }, [currentTest?.id, offset, setStatisticsByKey, statistics, storeKey])

    const prevButton = useCallback(() => {
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

    const reset = useCallback(() => {
        carTests[clearKey]()
        initStatisticsByKey(storeKey)
        window.location.reload()
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const handleKeyUpProcess = (e: KeyboardEvent) => {
            switch (e.key) {
                case 'n': {
                    prevButton()
                    break
                }
                case 'm': {
                    nextButton()
                    break
                }
                default:
                    break
            }
        }
        if (document) {
            document.addEventListener("keyup", handleKeyUpProcess, false)
        }
        return () => {
            if (document) {
                document.removeEventListener("keyup", handleKeyUpProcess, false)
            }
        }
    }, [nextButton, prevButton]);

    if (!mounted) {
        return null
    }
    if (!testPack) {
        return null
    }

    if (currentTest == null) {
        return (
            <div className="flex justify-center items-center">
                <Button variant="green"
                        onClick={reset}>
                    再来一次
                </Button>
            </div>
        )
    }

    const onSuccess = (id: string) => {
        const {successIds, answeredIds} = statistics
        successIds.push(id)
        answeredIds.push(id)
        setStatisticsByKey(storeKey, statistics)
        nextButton()
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
        nextButton()
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
            <div className="flex items-end justify-end fixed bottom-3 right-5 ">
                <CarTestRightBottomButton
                    prevButton={prevButton}
                    nextButton={nextButton}
                />
            </div>
            <div className="fixed bottom-0 p-3 font-semibold" >
                <CarTestStatistics
                    storeKey={storeKey}
                    limitCount={testPack.test.length}
                    offset={offset}
                />
            </div>
        </div>
    )
}
