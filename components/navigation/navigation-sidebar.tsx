import {ModeToggle} from "@/components/mode-toggle";
import {Separator} from "@/components/ui/separator";

const NavigationSidebar = () => {
    return (

        <div
        className="space-y-4 flex flex-col items-center
        h-full text-primary w-full py-3 dark:bg-[#1E1F22] border-2"

        >
            {/*可以考虑对这个组件进行循环，让它起到导航的作用*/}
            <Separator
                className="h-[2px] bg-zinc-300 dark:bg-zinc-700
                rounded-md w-10 mx-auto"
            />

            <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
                <ModeToggle/>
            </div>

        </div>
    )
}

export default NavigationSidebar