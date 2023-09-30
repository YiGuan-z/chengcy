"use client"

import {useRouter} from "next/navigation";

import ActionTooltip from "@/components/action-tooltip";
import {useCallback} from "react";

export interface NavigationProps {
    title: string
    label: string
    destination: string,
    children: React.ReactNode,
}

const NavigationAction = ({title, label, destination, children}: NavigationProps) => {
    const router = useRouter()
    const onClick = useCallback(() => {
        router.push(destination)

    }, [destination, router]);

    return (
        <div>
            <ActionTooltip
                label={label}
                side="right"
                align="center"
            >
                <div>
                    <button
                        className="group flex items-center"
                        onClick={onClick}
                    >
                        <div className="
                    flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px]
                    transition-all overflow-hidden items-center justify-center bg-background dark:bg-neutral-700
                    group-hover:bg-emerald-500
                    ">
                            {children}
                        </div>
                    </button>
                    <p className="text-center text-xs font-semibold p-2">{title}</p>
                </div>

            </ActionTooltip>
        </div>
    )
}

export default NavigationAction