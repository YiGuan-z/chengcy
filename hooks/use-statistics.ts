import {create} from "zustand";
import {persist} from "zustand/middleware";
import {arrayToMap} from "@/lib/array-utils";
import {mapToArray} from "@/lib/map-utils";

export interface Statistics {
    successIds: string[],
    failedIds: string[],
    answeredIds: string[],
    //通常是answeredIds的最后一个
    currentId: string
}

export interface UseStatisticsStore {
    statistics: Map<string, Statistics>
    getStatisticsByKey: (key: string) => Statistics | null
    setStatisticsByKey: (key: string, item: Statistics) => void
    removeStatisticsByKey: (key: string) => void
    initStatisticsByKey: (key: string) => void
    hasKey: (key: string) => boolean
}

export const useStatistics = create(
    persist<UseStatisticsStore>(
        (set, get) => ({
            statistics: new Map<string, Statistics>(),
            initStatisticsByKey: (key: string) => {
                const map = new Map(get().statistics);
                map.set(key, {
                    successIds: [],
                    failedIds: [],
                    answeredIds: [],
                    currentId: ""
                })
                set({statistics: map})
            },
            hasKey: (key: string) => {
                return get().statistics.has(key)
            },
            getStatisticsByKey: (key: string) => {
                return get().statistics.get(key) || null
            },
            setStatisticsByKey: (key: string, item: Statistics) => {
                //因为zustand依赖于不可变性来确定渲染时机，所以我们不能够直接修改内部值，需要对其进行重新创建
                const statistics = new Map(get().statistics)
                statistics.set(key, item)
                set({statistics})
            },
            removeStatisticsByKey: (key: string) => {
                const statistics = new Map(get().statistics);
                statistics.delete(key)
                //删除其中的一个key
                set({statistics})
            }
        }),
        {
            name: "statistics",
            //https://github.com/pmndrs/zustand/blob/main/docs/integrations/persisting-store-data.md#how-do-i-use-it-with-map-and-set

            //我折腾了那么久，居然告诉我不支持map和set
            storage: {
                getItem: (name) => {
                    const str = localStorage.getItem(name) || ""
                    const json = JSON.parse(str)
                    const element = json.state.statistics;
                    const map = arrayToMap(element);
                    return {
                        ...json,
                        state: {
                            statistics: map
                        }
                    }
                },
                setItem: (name, newValue) => {
                    const statistics = newValue.state.statistics
                    const array = mapToArray(statistics);
                    const str = JSON.stringify({
                        state: {
                            ...newValue.state,
                            statistics: array,
                        }
                    })
                    localStorage.setItem(name, str)
                },
                removeItem: (name) => localStorage.removeItem(name)
            },
        }
    )
)
