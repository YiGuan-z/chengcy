"use client"
import React, {useCallback, useEffect, useState} from "react";
import {useStatistics} from "@/components/modules/car/hooks/use-statistics";


export interface CarTestStatisticsProps {
    storeKey: string
    offset: number
    limitCount: number
}

const CarTestStatistics = ({
                               storeKey,
                               offset,
                               limitCount
                           }: CarTestStatisticsProps) => {

    const {getStatisticsByKey} = useStatistics()
    const statistics = getStatisticsByKey(storeKey)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, []);

    const successAnswerCount = useCallback(() => {
        return statistics?.answeredIds.length
    }, [statistics?.answeredIds.length]);

    const failAnswerCount = useCallback(() => {
        return statistics?.failedIds.length
    }, [statistics?.failedIds.length]);

    const oldAnswerCount = useCallback(() => {
        return statistics?.answeredIds.length
    }, [statistics?.answeredIds.length]);

    if (!mounted) {
        return null
    }
    return (
        <>
            分数:
            <span className="font-bold">{successAnswerCount()}/{limitCount}</span>
            错误:
            <span className="font-bold">{failAnswerCount()}</span>
            <div/>
            已答:
            <span className="font-bold">{oldAnswerCount()}</span>
            第<span className="font-bold">{offset + 1}</span>题
        </>
    )
}

export default CarTestStatistics