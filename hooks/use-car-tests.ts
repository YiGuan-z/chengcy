import {create} from "zustand";
import {createJSONStorage, persist} from "zustand/middleware";
import {CarTest} from "@/lib/types";

interface CarTestsPack {
    test: CarTest[]
    //CarTest的题目id与是否正确
    successIds:Set<string>
    failedIds:Set<string>
    //已回答的题目id
    oldIds:Set<string>
}

export interface CarTests {
    test1: CarTestsPack|null
    test4: CarTestsPack|null
    setTest1: (pack: CarTestsPack) => void
    clearTest1: () => void
    setTest4: (pack: CarTestsPack) => void
    clearTest4: () => void
}

export const useCarTests = create(
    persist<CarTests>(
        (set, get) => ({
            test1:null,
            test4:null,
            setTest1(pack) {
                set({test1: pack})
            },
            setTest4(pack) {
                set({test4: pack})
            },
            clearTest1() {
                set({test1: null})
            },
            clearTest4() {
                set({test4: null})
            }
        }),
        {
            name: "carTests",
            storage: createJSONStorage(() => localStorage),
        }
    )
)
