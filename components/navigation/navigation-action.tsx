"use client"

import ActionTooltip from "@/components/action-tooltip";
import {Car} from "lucide-react";
import {useRouter} from "next/navigation";

export interface NavigationProps {
    label: string
    destination: string,
    children: React.ReactNode,
}

const NavigationAction = ({label, destination, children}: NavigationProps) => {
    const router = useRouter()
    const onClick = () => {
        router.push(destination)
    }
    return (
        <div>
            <ActionTooltip
                label={label}
                side="right"
                align="center"
            >
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

            </ActionTooltip>
        </div>
    )
}

export default NavigationAction