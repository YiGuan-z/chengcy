import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import React from "react";

export interface CarTestRightBottomButtonProps {
    prevButton: () => void
    nextButton: () => void
}

const CarTestRightBottomButton = ({
                                      prevButton,
                                      nextButton
                                  }: CarTestRightBottomButtonProps) => {
    return (
        <>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger className="group">
                        <div role="button" tabIndex={0} className="mr-2 h-1/2 p-6 w-auto
                            bg-blue-600 hover:bg-blue-700 dark:bg-white dark:hover:bg-zinc-400
                            rounded-[8px] group-hover:rounded-[16px]
                            text-white dark:text-zinc-500
                            flex items-center justify-center
                            transition-all overflow-hidden
                            " onClick={prevButton}>
                            <p>上一题</p>
                        </div>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>使用快捷键n可返回上一题</p>
                    </TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger className="group">
                        <div role="button" tabIndex={0} className="mr-2 h-1/2 p-6 w-auto
                            bg-blue-600 hover:bg-blue-700 dark:bg-white dark:hover:bg-zinc-400
                            rounded-[8px] group-hover:rounded-[16px]
                            text-white dark:text-zinc-500
                            flex items-center justify-center
                            transition-all overflow-hidden
                            "
                             onClick={nextButton}>
                            <p>下一题</p>
                        </div>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>使用快捷键m可前往下一题</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </>
    )
}

export default CarTestRightBottomButton